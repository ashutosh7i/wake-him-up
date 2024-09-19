import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

import DefaultLayout from "@/layouts/default";
import WakeButton from "@/components/WakeButton";
import ConnectionStatusManager from "@/components/ConnectionStatusManager";
import PeerConnection from "@/components/PeerConnection";

export default function IndexPage() {
  const [statusKey, setStatusKey] = useState(0);
  const [peerStatus, setPeerStatus] = useState("disconnected");
  const { user, loading } = useAuth();
  const router = useRouter();
  const peerConnectionRef = useRef<{ handleWakeUp: () => void } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleStatusChange = useCallback(() => {
    setStatusKey((prev) => prev + 1);
  }, []);

  const handlePeerStatusChange = useCallback((status: string) => {
    console.log("Peer status changed:", status);
    setPeerStatus(status);
  }, []);

  const handleWakeUp = useCallback(() => {
    console.log("Wake Up button clicked in IndexPage");
    if (peerConnectionRef.current) {
      peerConnectionRef.current.handleWakeUp();
    } else {
      console.log("PeerConnection ref is not available");
    }
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col h-screen">
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <WakeButton
            onWakeUp={handleWakeUp}
            isConnected={peerStatus === "connected"}
          />
          <div className="my-7" />
          <ConnectionStatusManager key={statusKey} peerStatus={peerStatus} />
        </main>
        <footer className="p-4">
          <PeerConnection
            ref={peerConnectionRef}
            onConnectionStatusChange={handlePeerStatusChange}
            onStatusChange={handleStatusChange}
          />
        </footer>
      </div>
    </DefaultLayout>
  );
}
