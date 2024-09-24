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
import { playSound, stopSound } from "@/utils/soundManager";

interface PeerConnectionProps {
  onConnectionStatusChange: (status: string) => void;
  onStatusChange: () => void;
  onCloseChatModal?: () => void;
}

const PeerConnection = forwardRef<
  { handleWakeUp: () => void },
  PeerConnectionProps
>(({ onConnectionStatusChange, onStatusChange, onCloseChatModal }, ref) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);
  const [showWakeCard, setShowWakeCard] = useState(false);
  const [wakeUpConfirmation, setWakeUpConfirmation] = useState(false);
  const { onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    handleWakeUp: () => {
      if (conn) {
        conn.send("WAKE_UP");
        onConnectionStatusChange("Waking up partner...");
        if (onCloseChatModal) {
          onCloseChatModal();
        }
      }
    },
  }));

  useEffect(() => {
    const newPeer = new Peer();

    setPeer(newPeer);

    newPeer.on("open", async (id) => {
      await updateConnectionId(id);
      const partnerPeerId = await getPartnerPeerId();

      if (partnerPeerId) {
        connectToPeer(newPeer, partnerPeerId);
      }
    });

    newPeer.on("connection", (connection) => {
      setConn(connection);
      setupConnection(connection);
    });

    return () => {
      newPeer.destroy();
    };
  }, [onConnectionStatusChange]);

  const connectToPeer = (peer: Peer, peerId: string) => {
    const newConn = peer.connect(peerId);

    setConn(newConn);
    setupConnection(newConn);
  };

  const setupConnection = (connection: DataConnection) => {
    connection.on("open", () => {
      onConnectionStatusChange("connected");
    });

    connection.on("data", (data) => {
      handleIncomingData(data);
    });

    connection.on("close", () => {
      onConnectionStatusChange("disconnected");
    });
  };

  const handleIncomingData = useCallback(
    (data: any) => {
      if (data === "WAKE_UP") {
        setShowWakeCard(true);
        playSound();
        if (onCloseChatModal) {
          onCloseChatModal();
        }
      } else if (data === "WOKE_UP") {
        setWakeUpConfirmation(true);
        onOpen();
        stopSound();
      } else if (data === "WAKE_UP_CONFIRMED") {
        stopSound();
        setShowWakeCard(false);
        onConnectionStatusChange("Wake up confirmed");
      } else if (data === "WAKE_UP_REJECTED") {
        setShowWakeCard(true);
        playSound();
        onConnectionStatusChange("Wake up rejected, trying again");
      }
    },
    [onOpen, onConnectionStatusChange, onCloseChatModal],
  );

  const handleWokeUp = useCallback(() => {
    if (conn) {
      conn.send("WOKE_UP");
      setShowWakeCard(false);
      stopSound();
    }
  }, [conn]);

  const handleMute = useCallback(() => {
    stopSound();
    setTimeout(() => {
      if (showWakeCard) {
        playSound();
      }
    }, 15000);
  }, [showWakeCard]);

  const handleWakeUpConfirmation = useCallback(
    (confirmed: boolean) => {
      setWakeUpConfirmation(false);
      onClose();
      if (confirmed) {
        if (conn) {
          conn.send("WAKE_UP_CONFIRMED");
        }
        onConnectionStatusChange("Partner woke up");
      } else {
        if (conn) {
          conn.send("WAKE_UP_REJECTED");
        }
        onConnectionStatusChange(
          "Wake up rejected, partner needs to try again",
        );
      }
    },
    [onClose, onConnectionStatusChange, conn],
  );

  return (
    <>
      <div className="flex justify-center space-x-4">
        <ControlButtons
          buttonClassName="w-16 h-16 text-xl" // Increase button size
          conn={conn}
          peer={peer}
          onStatusChange={onStatusChange}
        />
      </div>
      <WakeCard
        isOpen={showWakeCard}
        onClose={() => {
          setShowWakeCard(false);
          stopSound();
        }}
        onMute={handleMute}
        onWokeUp={handleWokeUp}
      />
      <Modal
        closeButton={false}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={wakeUpConfirmation}
        onClose={() => handleWakeUpConfirmation(false)}
      >
        <ModalContent>
          <ModalHeader>Partner Woke Up</ModalHeader>
          <ModalBody>
            <p>Your partner has indicated that they are awake.</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => handleWakeUpConfirmation(true)}
            >
              Confirm
            </Button>
            <Button
              color="danger"
              onPress={() => handleWakeUpConfirmation(false)}
            >
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

PeerConnection.displayName = "PeerConnection";

export default PeerConnection;
