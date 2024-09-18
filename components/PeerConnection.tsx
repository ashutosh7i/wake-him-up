// import React, { useEffect, useState } from 'react';
// import { Peer } from 'peerjs';
// import { updateConnectionId, getPartnerPeerId } from '@/config/appwrite';
// import ChatModal from './ChatMode';

// interface PeerConnectionProps {
//   onConnectionStatusChange: (status: string) => void;
// }

// const PeerConnection: React.FC<PeerConnectionProps> = ({ onConnectionStatusChange }) => {
//   const [peer, setPeer] = useState<Peer | null>(null);
//   const [conn, setConn] = useState<Peer.DataConnection | null>(null);

//   useEffect(() => {
//     const newPeer = new Peer();
//     setPeer(newPeer);

//     newPeer.on('open', async (id) => {
//       console.log('My peer ID is:', id);
//       await updateConnectionId(id);
//       const partnerPeerId = await getPartnerPeerId();
//       if (partnerPeerId) {
//         console.log("Partner's peer ID is:", partnerPeerId);
//         connectToPeer(newPeer, partnerPeerId);
//       } else {
//         console.log("No partner peer ID found");
//       }
//     });

//     newPeer.on('connection', (connection) => {
//       console.log('Incoming connection');
//       setConn(connection);
//       setupConnection(connection);
//     });

//     return () => {
//       newPeer.destroy();
//     };
//   }, [onConnectionStatusChange]);

//   const connectToPeer = (peer: Peer, peerId: string) => {
//     console.log(`Attempting to connect to peer: ${peerId}`);
//     const newConn = peer.connect(peerId);
//     setConn(newConn);
//     setupConnection(newConn);
//   };

//   const setupConnection = (connection: Peer.DataConnection) => {
//     connection.on('open', () => {
//       console.log('Connected to:', connection.peer);
//       onConnectionStatusChange('connected');
//     });

//     connection.on('data', (data) => {
//       console.log('Received:', data);
//     });

//     connection.on('close', () => {
//       console.log('Connection closed');
//       onConnectionStatusChange('disconnected');
//     });
//   };

//   return <ChatModal peer={peer} conn={conn} />;
// };

// export default PeerConnection;



import React, { useEffect, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { updateConnectionId, getPartnerPeerId } from '@/config/appwrite';
import ControlButtons from './ControlButtons';

interface PeerConnectionProps {
  onConnectionStatusChange: (status: string) => void;
  onStatusChange: () => void;
}

const PeerConnection: React.FC<PeerConnectionProps> = ({ onConnectionStatusChange, onStatusChange }) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on('open', async (id) => {
      console.log('My peer ID is:', id);
      await updateConnectionId(id);
      const partnerPeerId = await getPartnerPeerId();
      if (partnerPeerId) {
        console.log("Partner's peer ID is:", partnerPeerId);
        connectToPeer(newPeer, partnerPeerId);
      } else {
        console.log("No partner peer ID found");
      }
    });

    newPeer.on('connection', (connection) => {
      console.log('Incoming connection');
      setConn(connection);
      setupConnection(connection);
    });

    return () => {
      newPeer.destroy();
    };
  }, [onConnectionStatusChange]);

  const connectToPeer = (peer: Peer, peerId: string) => {
    console.log(`Attempting to connect to peer: ${peerId}`);
    const newConn = peer.connect(peerId);
    setConn(newConn);
    setupConnection(newConn);
  };

  const setupConnection = (connection: DataConnection) => {
    connection.on('open', () => {
      console.log('Connected to:', connection.peer);
      onConnectionStatusChange('connected');
    });

    connection.on('data', (data) => {
      console.log('Received:', data);
    });

    connection.on('close', () => {
      console.log('Connection closed');
      onConnectionStatusChange('disconnected');
    });
  };
  return <ControlButtons peer={peer} conn={conn} onStatusChange={onStatusChange} />;
};

export default PeerConnection;