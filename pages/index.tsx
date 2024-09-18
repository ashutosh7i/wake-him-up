// import { useState, useCallback } from 'react';
// import DefaultLayout from "@/layouts/default";
// import WakeButton from "@/components/WakeButton";
// import ConnectionStatusManager from "@/components/ConnectionStatusManager";
// import ControlButtons from "@/components/ControlButtons";
// import WakeCard from "@/components/WakeCard";
// import PeerConnection from "@/components/PeerConnection";
// import Account from "@/components/Account";
// import SettingsModal from "@/components/SettingsModal";

// export default function IndexPage() {
//   const [statusKey, setStatusKey] = useState(0);
//   const [peerStatus, setPeerStatus] = useState('disconnected');

//   const handleStatusChange = useCallback(() => {
//     setStatusKey(prev => prev + 1);
//   }, []);

//   const handlePeerStatusChange = useCallback((status: string) => {
//     setPeerStatus(status);
//   }, []);

//   return (
//     <DefaultLayout>
//       <div className="flex flex-col h-screen">
//         <main className="flex-grow flex flex-col items-center justify-center p-4">
//           <WakeButton />
//           <div className="my-7" />
//           <ConnectionStatusManager key={statusKey} peerStatus={peerStatus} />
//         </main>
//         <footer className="p-4">
//           <ControlButtons />
//         </footer>
//       </div>
//       <Account />
//       <WakeCard onWokeUp={() => {}} onMute={() => {}} />
//       <PeerConnection onConnectionStatusChange={handlePeerStatusChange} />
//       <SettingsModal onStatusChange={handleStatusChange} />
//     </DefaultLayout>
//   );
// }

import { useState, useCallback } from "react";

import DefaultLayout from "@/layouts/default";
import WakeButton from "@/components/WakeButton";
import ConnectionStatusManager from "@/components/ConnectionStatusManager";
import WakeCard from "@/components/WakeCard";
import PeerConnection from "@/components/PeerConnection";

export default function IndexPage() {
  const [statusKey, setStatusKey] = useState(0);
  const [peerStatus, setPeerStatus] = useState("disconnected");

  const handleStatusChange = useCallback(() => {
    setStatusKey((prev) => prev + 1);
  }, []);

  const handlePeerStatusChange = useCallback((status: string) => {
    setPeerStatus(status);
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col h-screen">
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <WakeButton />
          <div className="my-7" />
          <ConnectionStatusManager key={statusKey} peerStatus={peerStatus} />
        </main>
        <footer className="p-4">
          <PeerConnection
            onConnectionStatusChange={handlePeerStatusChange}
            onStatusChange={handleStatusChange}
          />
        </footer>
      </div>
      {/* <Account /> */}
      <WakeCard onMute={() => {}} onWokeUp={() => {}} />
    </DefaultLayout>
  );
}
