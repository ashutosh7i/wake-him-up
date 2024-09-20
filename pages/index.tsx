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
    setPeerStatus(status);
  }, []);

  const handleWakeUp = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.handleWakeUp();
    }
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col h-full justify-between py-8">
        <div className="flex-grow flex flex-col items-center justify-start pt-16 pb-5">
          <WakeButton
            isConnected={peerStatus === "connected"}
            onWakeUp={handleWakeUp}
          />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <ConnectionStatusManager key={statusKey} peerStatus={peerStatus} />
        </div>
        <div className="flex-shrink-0 pt-16">
          <PeerConnection
            ref={peerConnectionRef}
            onConnectionStatusChange={handlePeerStatusChange}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
