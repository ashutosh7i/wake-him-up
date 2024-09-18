import DefaultLayout from "@/layouts/default";
import WakeButton from "@/components/WakeButton";
import ConnectionStatus from "@/components/ConnectionStatus";
import ControlButtons from "@/components/ControlButtons";
import WakeCard from "@/components/WakeCard";
import PeerConnection from "@/components/PeerConnection";

export default function IndexPage() {

  return (
    <DefaultLayout>
      <div className="flex flex-col h-screen">

        {/* Main content */}
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <WakeButton />
          <div className="my-7" /> {/* Decreased space from my-7 to my-4 */}
          <ConnectionStatus message="connectingkkkk.." msgtype="log" />
          <ConnectionStatus message="connectingkkkk.." msgtype="info" />
          <ConnectionStatus message="connectingkkkk.." msgtype="success" />
          <ConnectionStatus message="connectingkkkk.." msgtype="error" />
        </main>

        {/* Footer */}
        <footer className="p-4">
          <ControlButtons />
        </footer>
      </div>

      <WakeCard onWokeUp={() => {}} onMute={() => {}} />
      <PeerConnection />
    </DefaultLayout>
  );
}