import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface WakeCardProps {
  onWokeUp: () => void;
  onMute: () => void;
}

const WakeCard: React.FC<WakeCardProps> = ({ onWokeUp, onMute }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMuted, setIsMuted] = useState(false);

  const handleWokeUp = () => {
    onWokeUp();
    onOpenChange();
    
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    onMute();
  };

  return (
    <>
      <div className="wake-card">
        <Button onPress={onOpen}>Open Modal</Button>
        <Modal placement='center'
        backdrop='blur'
       isDismissable={false}
       isKeyboardDismissDisabled={true}
       hideCloseButton={true}

        isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody className="flex flex-col items-center justify-center text-center">
                  <span className="text-6xl">😠</span>
                  <h2 className="text-2xl font-bold mt-2">😤Wake Up !!!</h2>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={handleWokeUp}>
                    Woke up 😳
                  </Button>
                  <Button onPress={handleMute}>{isMuted ? 'Unmute' : 'Mute'}</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default WakeCard;