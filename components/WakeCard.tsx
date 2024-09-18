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

        isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Wake Up!</ModalHeader>
                <ModalBody>
                  <p>Are you ready to wake up?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
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