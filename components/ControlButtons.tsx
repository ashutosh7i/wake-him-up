import React from "react";
import { Peer, DataConnection } from "peerjs";

import ChatModal from "./ChatMode";
import SettingsModal from "./SettingsModal";

interface ControlButtonsProps {
  peer: Peer | null;
  conn: DataConnection | null;
  onStatusChange: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  peer,
  conn,
  onStatusChange,
}) => {
  return (
    <div className="flex justify-center space-x-4">
      <ChatModal conn={conn} peer={peer} />
      <SettingsModal onStatusChange={onStatusChange} />
    </div>
  );
};

export default ControlButtons;
