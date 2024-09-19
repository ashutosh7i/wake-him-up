import React, {
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import Peer, { DataConnection } from "peerjs";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import ControlButtons from "./ControlButtons";
import WakeCard from "./WakeCard";

import { updateConnectionId, getPartnerPeerId } from "@/config/appwrite";

interface PeerConnectionProps {
  onConnectionStatusChange: (status: string) => void;
  onStatusChange: () => void;
}

const PeerConnection = forwardRef<
  { handleWakeUp: () => void },
  PeerConnectionProps
>(({ onConnectionStatusChange, onStatusChange }, ref) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);
  const [showWakeCard, setShowWakeCard] = useState(false);
  const [wakeUpConfirmation, setWakeUpConfirmation] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    handleWakeUp: () => {
      //console.log("Wake Up button clicked in PeerConnection");
      if (conn) {
        //console.log("Sending WAKE_UP signal");
        conn.send("WAKE_UP");
        onConnectionStatusChange("Waking up partner...");
      } else {
        //console.log("No connection available to send WAKE_UP signal");
      }
    },
  }));

  useEffect(() => {
    //console.log("Initializing PeerJS connection");
    const newPeer = new Peer();

    setPeer(newPeer);

    newPeer.on("open", async (id) => {
      //console.log("PeerJS connection opened with ID:", id);
      await updateConnectionId(id);
      const partnerPeerId = await getPartnerPeerId();

      if (partnerPeerId) {
        //console.log("Partner PeerID found:", partnerPeerId);
        connectToPeer(newPeer, partnerPeerId);
      } else {
        //console.log("No partner PeerID found");
      }
    });

    newPeer.on("connection", (connection) => {
      //console.log("Incoming connection from peer");
      setConn(connection);
      setupConnection(connection);
    });

    return () => {
      //console.log("Destroying PeerJS connection");
      newPeer.destroy();
    };
  }, [onConnectionStatusChange]);

  const connectToPeer = (peer: Peer, peerId: string) => {
    //console.log("Connecting to peer:", peerId);
    const newConn = peer.connect(peerId);

    setConn(newConn);
    setupConnection(newConn);
  };

  const setupConnection = (connection: DataConnection) => {
    connection.on("open", () => {
      //console.log("Connection opened");
      onConnectionStatusChange("connected");
    });

    connection.on("data", (data) => {
      //console.log("Received data:", data);
      handleIncomingData(data);
    });

    connection.on("close", () => {
      //console.log("Connection closed");
      onConnectionStatusChange("disconnected");
    });
  };

  const handleIncomingData = useCallback(
    (data: any) => {
      //console.log("Handling incoming data:", data);
      if (data === "WAKE_UP") {
        //console.log("Received WAKE_UP signal, showing WakeCard");
        setShowWakeCard(true);
      } else if (data === "WOKE_UP") {
        //console.log("Received WOKE_UP signal, showing confirmation");
        setWakeUpConfirmation(true);
        wakeUpConfirmation;
        onOpen();
      }
    },
    [onOpen],
  );

  const handleWokeUp = useCallback(() => {
    //console.log("User indicated they woke up");
    if (conn) {
      //console.log("Sending WOKE_UP signal");
      conn.send("WOKE_UP");
      setShowWakeCard(false);
    } else {
      //console.log("No connection available to send WOKE_UP signal");
    }
  }, [conn]);

  const handleMute = useCallback(() => {
    //console.log("Mute functionality not implemented yet");
    // Implement mute functionality
  }, []);

  const handleWakeUpConfirmation = useCallback(() => {
    //console.log("Wake up confirmation handled");
    setWakeUpConfirmation(false);
    onClose();
    onConnectionStatusChange("Partner woke up");
  }, [onClose, onConnectionStatusChange]);

  return (
    <>
      <ControlButtons conn={conn} peer={peer} onStatusChange={onStatusChange} />
      {showWakeCard && <WakeCard onMute={handleMute} onWokeUp={handleWokeUp} />}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Partner Woke Up</ModalHeader>
          <ModalBody>
            <p>Your partner has indicated that they are awake.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleWakeUpConfirmation}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

PeerConnection.displayName = "PeerConnection";

export default PeerConnection;
