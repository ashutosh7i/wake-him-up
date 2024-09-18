import React from 'react';
import { Button } from "@nextui-org/button";
import { MessageSquareHeart, Settings } from "lucide-react";
import ChatModal from './ChatMode';
import SettingsModal from './SettingsModal';
import { Peer, DataConnection } from 'peerjs';

interface ControlButtonsProps {
  peer: Peer | null;
  conn: DataConnection | null;
  onStatusChange: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ peer, conn, onStatusChange }) => {
  return (
    <div className="flex justify-center space-x-4">
      <ChatModal peer={peer} conn={conn} />
      <SettingsModal onStatusChange={onStatusChange}/>
    </div>
  );
};

export default ControlButtons;