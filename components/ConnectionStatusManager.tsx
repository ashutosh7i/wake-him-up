import React, { useState, useEffect, useCallback } from "react";
import ConnectionStatus from "./ConnectionStatus";
import { getPairStatus } from "@/config/appwrite";

type ConnectionState =
  | "initializing"
  | "unpaired"
  | "pairing"
  | "paired"
  | "connected"
  | "disconnected"
  | "error"
  | "incomingCall"
  | "calling"
  | "inCall"
  | "newMessage";

interface ConnectionStatusManagerProps {
  peerStatus: string;
}

export default function ConnectionStatusManager({
  peerStatus,
}: ConnectionStatusManagerProps) {
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("initializing");
  const [message, setMessage] = useState("Initializing...");

  const checkConnectionStatus = useCallback(async () => {
    try {
      const pairStatus = await getPairStatus();
      console.log("Pair status:", pairStatus.status);
      console.log("Peer status:", peerStatus);

      switch (pairStatus.status) {
        case "unpaired":
          setConnectionState("unpaired");
          setMessage("Not paired with anyone");
          break;
        case "waiting":
          setConnectionState("pairing");
          setMessage(`Waiting for ${pairStatus.partnerEmail} to confirm`);
          break;
        case "paired":
          if (peerStatus === "connected") {
            setConnectionState("connected");
            setMessage(`Connected to ${pairStatus.partnerEmail}`);
          } 
          else if (peerStatus === "disconnected") {
            setConnectionState("disconnected");
            setMessage(`Connecting to ${pairStatus.partnerEmail}`);
          }
          else if (peerStatus === "Waking up partner...") {
            setConnectionState("pairing");
            setMessage(`Waking up ${pairStatus.partnerEmail}`);
          }
          else if (peerStatus === "Partner woke up") {
            setConnectionState("connected");
            setMessage(`Partner woke up`);
          }
          else if (peerStatus === "Wake up confirmed") {
            setConnectionState("connected");
            setMessage(`Wake up confirmed`);
          }
          else if (peerStatus === "Incoming call") {
            setConnectionState("incomingCall");
            setMessage(`Incoming call from ${pairStatus.partnerEmail}`);
          }
          else if (peerStatus === "Calling...") {
            setConnectionState("calling");
            setMessage(`Calling ${pairStatus.partnerEmail}`);
          }
          else if (peerStatus === "In call") {
            setConnectionState("inCall");
            setMessage(`In call with ${pairStatus.partnerEmail}`);
          }
          else if (peerStatus === "New message") {
            setConnectionState("newMessage");
            setMessage(`New message from ${pairStatus.partnerEmail}`);
          }
          else {
            setConnectionState("paired");
            setMessage(`Connecting to ${pairStatus.partnerEmail}`);
          }
          break;
        default:
          setConnectionState("error");
          setMessage("Error checking pair status");
      }
    } catch (error) {
      console.error("Error checking connection status:", error);
      setConnectionState("error");
      setMessage("Error checking connection status");
    }
  }, [peerStatus]);

  useEffect(() => {
    checkConnectionStatus();
  }, [checkConnectionStatus, peerStatus]);

  return (
    <ConnectionStatus
      message={message}
      msgtype={getMessageType(connectionState)}
    />
  );
}

function getMessageType(
  state: ConnectionState,
): "success" | "error" | "info" | "log" {
  switch (state) {
    case "connected":
    case "inCall":
      return "success";
    case "error":
      return "error";
    case "initializing":
    case "pairing":
    case "calling":
    case "incomingCall":
      return "log";
    case "newMessage":
      return "log";
    default:
      return "info";
  }
}
