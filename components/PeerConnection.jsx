import React, { useEffect, useState } from 'react';
import { Peer, DataConnection } from 'peerjs';

const PeerConnection = () => {
  const [peerId, setPeerId] = useState('');
  const [peer, setPeer] = useState(null);
  const [connectionId, setConnectionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [conn, setConn] = useState(null);

  useEffect(() => {
    // const newPeer = new Peer();
    const newPeer = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443})

    newPeer.on('open', (id) => {
      console.log('My peer ID is:', id);
      setPeerId(id);
    });

    newPeer.on('connection', (connection) => {
      setConn(connection);
      connection.on('open', () => {
        console.log('connected');
        connection.on('data', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      });
    });

    setPeer(newPeer);

    return () => {
      newPeer.destroy();
    };
  }, []);

  const connectToPeer = () => {
    if (peer && connectionId) {
      const newConn = peer.connect(connectionId);
      newConn.on('open', () => {
        console.log('connected');
        newConn.on('data', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      });
      setConn(newConn);
    }
  };

  const sendMessage = () => {
    if (conn && messageInput) {
      conn.send(messageInput);
      setMessages((prevMessages) => [...prevMessages, messageInput]);
      setMessageInput('');
    }
  };

  return (
    <div>
      <h2>PeerJS Connection</h2>
      <p>Your Peer ID: {peerId}</p>
      <input
        type="text"
        value={connectionId}
        onChange={(e) => setConnectionId(e.target.value)}
        placeholder="Enter peer ID to connect"
      />
      <button onClick={connectToPeer}>Connect</button>
      <div>
        <h3>Messages</h3>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default PeerConnection;