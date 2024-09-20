import React from "react";
import { Peer, DataConnection } from "peerjs";

import ChatModal from "./ChatMode";
import SettingsModal from "./SettingsModal";

interface ControlButtonsProps {
  peer: Peer | null;
  conn: DataConnection | null;
  onStatusChange: () => void;
  buttonClassName?: string;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  peer,
  conn,
  onStatusChange,
  buttonClassName = "",
}) => {
  return (
    <div className="flex justify-center space-x-16">
      <ChatModal conn={conn} peer={peer} onStatusChange={onStatusChange} buttonClassName={buttonClassName} />
      <SettingsModal onStatusChange={onStatusChange} buttonClassName={buttonClassName} />
    </div>
  );
};

export default ControlButtons;
