import { Button } from "@nextui-org/button";

interface WakeButtonProps {
  onWakeUp: () => void;
  isConnected: boolean;
}

export default function WakeButton({ onWakeUp, isConnected }: WakeButtonProps) {
  const handleClick = () => {
    if (isConnected) {
      onWakeUp();
    } else {
      window.location.reload();
    }
  };

  return (
    <Button
      className="w-64 h-64 text-xl font-bold bg-gradient-to-br from-red-500 to-pink-500 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      radius="full"
      size="lg"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center text-white">
        <span className="text-4xl animate-bounce pt-2">😾</span>
        <span className="text-2xl">wake</span>
        <span className="text-2xl">them</span>
        <span className="text-2xl">up</span>
        <span className="text-4xl mt-2 animate-pulse">😴</span>
      </div>
    </Button>
  );
}
