// import React, { useState } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
// } from "@nextui-org/modal";
// import { Button } from "@nextui-org/button";

// interface WakeCardProps {
//   onWokeUp: () => void;
//   onMute: () => void;
// }

// const WakeCard: React.FC<WakeCardProps> = ({ onWokeUp, onMute }) => {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [isMuted, setIsMuted] = useState(false);

//   const handleWokeUp = () => {
//     onWokeUp();
//     onOpenChange();
//   };

//   const handleMute = () => {
//     setIsMuted(!isMuted);
//     onMute();
//   };

//   return (
//     <>
//       <div className="wake-card">
//         <Button onPress={onOpen}>Open Modal</Button>
//         <Modal
//           backdrop="blur"
//           hideCloseButton={true}
//           isDismissable={false}
//           isKeyboardDismissDisabled={true}
//           isOpen={isOpen}
//           placement="center"
//           onOpenChange={onOpenChange}
//         >
//           <ModalContent>
//             {() => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1" />
//                 <ModalBody className="flex flex-col items-center justify-center text-center">
//                   <span className="text-6xl">😠</span>
//                   <h2 className="text-2xl font-bold mt-2">😤Wake Up !!!</h2>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="primary" onPress={handleWokeUp}>
//                     Woke up 😳
//                   </Button>
//                   <Button onPress={handleMute}>
//                     {isMuted ? "Unmute" : "Mute"}
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default WakeCard;

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface WakeCardProps {
  onWokeUp: () => void;
  onMute: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const WakeCard: React.FC<WakeCardProps> = ({
  onWokeUp,
  onMute,
  isOpen,
  onClose,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [muteTimer, setMuteTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (muteTimer) {
        clearTimeout(muteTimer);
      }
    };
  }, [muteTimer]);

  const handleWokeUp = () => {
    onWokeUp();
    onClose();
  };

  const handleMute = () => {
    setIsMuted(true);
    onMute();

    if (muteTimer) {
      clearTimeout(muteTimer);
    }

    const timer = setTimeout(() => {
      setIsMuted(false);
      onMute(); // Unmute after 15 seconds
    }, 15000);

    setMuteTimer(timer);
  };

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={true}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      placement="center"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1" />
        <ModalBody className="flex flex-col items-center justify-center text-center">
          <span className="text-6xl">😠</span>
          <h2 className="text-2xl font-bold mt-2">😤Wake Up !!!</h2>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={handleWokeUp}>
            Woke up 😳
          </Button>
          <Button disabled={isMuted} onPress={handleMute}>
            {isMuted ? "Muted (15s)" : "Mute (15s)"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WakeCard;
