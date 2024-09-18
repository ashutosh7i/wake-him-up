import { Button } from "@nextui-org/button";
import { User, AnchorIcon } from "@nextui-org/shared-icons";

export default function ControlButtons() {
  return (
    <div className="flex justify-between items-center">
      <Button isIconOnly variant="light" aria-label="Settings" className="bg-gray-200 p-4">
        <AnchorIcon className="text-gray-600" />
      </Button>
      <Button isIconOnly variant="light" aria-label="Profile" className="bg-gray-200 p-4">
        <User className="text-gray-600" />
      </Button>
    </div>
  );
}