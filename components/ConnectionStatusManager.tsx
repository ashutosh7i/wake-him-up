// import React, { useState, useEffect, useCallback } from 'react';
// import ConnectionStatus from './ConnectionStatus';
// import { getPairStatus } from '@/config/appwrite';

// type ConnectionState = 'initializing' | 'unpaired' | 'pairing' | 'paired' | 'active' | 'idle' | 'error';

// export default function ConnectionStatusManager() {
//   const [connectionState, setConnectionState] = useState<ConnectionState>('initializing');
//   const [message, setMessage] = useState('Initializing...');

//   const checkConnectionStatus = useCallback(async () => {
//     try {
//       const pairStatus = await getPairStatus();

//       switch (pairStatus.status) {
//         case 'unpaired':
//           setConnectionState('unpaired');
//           setMessage('Not paired with anyone');
//           break;
//         case 'waiting':
//           setConnectionState('pairing');
//           setMessage(`Waiting for ${pairStatus.partnerEmail} to confirm`);
//           break;
//         case 'paired':
//           setConnectionState('paired');
//           setMessage(`Paired with ${pairStatus.partnerEmail}`);
//           break;
//         default:
//           setConnectionState('error');
//           setMessage('Error checking pair status');
//       }
//     } catch (error) {
//       //console.error('Error checking connection status:', error);
//       setConnectionState('error');
//       setMessage('Error checking connection status');
//     }
//   }, []);

//   useEffect(() => {
//     checkConnectionStatus();
//   }, [checkConnectionStatus]);

//   return <ConnectionStatus message={message} msgtype={getMessageType(connectionState)} />;
// }

// function getMessageType(state: ConnectionState): 'success' | 'error' | 'info' | 'log' {
//   switch (state) {
//     case 'paired':
//     case 'active':
//       return 'success';
//     case 'error':
//       return 'error';
//     case 'initializing':
//     case 'pairing':
//       return 'log';
//     default:
//       return 'info';
//   }
// }

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
  | "error";

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
          } else {
            setConnectionState("paired");
            setMessage(`Paired with ${pairStatus.partnerEmail}, connecting...`);
          }
          break;
        default:
          setConnectionState("error");
          setMessage("Error checking pair status");
      }
    } catch (error) {
      //console.error("Error checking connection status:", error);
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
      return "success";
    case "error":
      return "error";
    case "initializing":
    case "pairing":
      return "log";
    default:
      return "info";
  }
}
