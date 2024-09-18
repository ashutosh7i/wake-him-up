// import React, { useState, useEffect } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
// import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";
// import { Settings } from "lucide-react";
// import { getPairStatus, initiatePairing, confirmPairing, breakupPairing } from "@/config/appwrite";

// export default function SettingsModal({ onStatusChange }: { onStatusChange: () => void }) {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [pairStatus, setPairStatus] = useState<"unpaired" | "waiting" | "paired" | "error">("unpaired");
//   const [partnerEmail, setPartnerEmail] = useState("");
//   const [inputEmail, setInputEmail] = useState("");

//   useEffect(() => {
//     if (isOpen) {
//       fetchPairStatus();
//     }
//   }, [isOpen]);

//   const fetchPairStatus = async () => {
//     const status = await getPairStatus();
//     setPairStatus(status.status as "unpaired" | "waiting" | "paired" | "error");
//     if (status.partnerEmail) {
//       setPartnerEmail(status.partnerEmail);
//     }
//   };

//   const handleAddPartner = async () => {
//     const result = await initiatePairing(inputEmail);
//     if (result.success) {
//       setPairStatus("waiting");
//       setPartnerEmail(inputEmail);
//       onStatusChange();
//     } else {
//       alert(`Failed to initiate pairing: ${result.reason}`);
//     }
//   };

//   const handleConfirmPairing = async () => {
//     const result = await confirmPairing(partnerEmail);
//     if (result.success) {
//       setPairStatus("paired");
//       onStatusChange();
//     } else {
//       alert(`Failed to confirm pairing: ${result.reason}`);
//     }
//   };

//   const handleBreakup = async () => {
//     const result = await breakupPairing();
//     if (result.success) {
//       setPairStatus("unpaired");
//       setPartnerEmail("");
//       onStatusChange();
//     } else {
//       alert("Failed to breakup. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <Button isIconOnly onPress={onOpen} color="default" aria-label="Settings">
//         <Settings />
//       </Button>
//       <Modal
//         isDismissable={false}
//         isKeyboardDismissDisabled={true}
//         isOpen={isOpen}
//         placement="center"
//         onOpenChange={onOpenChange}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Partner Settings</ModalHeader>
//               <ModalBody>
//                 {pairStatus === "unpaired" && (
//                   <>
//                     <p>Enter your partner's email to start pairing:</p>
//                     <Input
//                       value={inputEmail}
//                       onChange={(e) => setInputEmail(e.target.value)}
//                       placeholder="Partner's email"
//                     />
//                     <Button color="primary" onPress={handleAddPartner}>
//                       Add Partner
//                     </Button>
//                   </>
//                 )}
//                 {pairStatus === "waiting" && (
//                   <>
//                     <p>Waiting for {partnerEmail} to confirm the pairing.</p>
//                     <Button color="primary" onPress={handleConfirmPairing}>
//                       Confirm Pairing
//                     </Button>
//                   </>
//                 )}
//                 {pairStatus === "paired" && (
//                   <>
//                     <p>You are paired with: {partnerEmail}👩‍❤️‍👨</p>
//                     <Button color="danger" onPress={handleBreakup}>
//                       Breakup🥲
//                     </Button>
//                   </>
//                 )}
//                 {pairStatus === "error" && (
//                   <p>An error occurred. Please try again later.</p>
//                 )}
//               </ModalBody>
//               <ModalFooter>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Settings } from "lucide-react";
import { getPairStatus, initiatePairing, confirmPairing, breakupPairing } from "@/config/appwrite";

interface SettingsModalProps {
  onStatusChange: () => void;
}

export default function SettingsModal({ onStatusChange }: SettingsModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pairStatus, setPairStatus] = useState<"unpaired" | "waiting" | "paired" | "error">("unpaired");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchPairStatus();
    }
  }, [isOpen]);

  const fetchPairStatus = async () => {
    const status = await getPairStatus();
    setPairStatus(status.status as "unpaired" | "waiting" | "paired" | "error");
    if (status.partnerEmail) {
      setPartnerEmail(status.partnerEmail);
    }
  };

  const handleAddPartner = async () => {
    const result = await initiatePairing(inputEmail);
    if (result.success) {
      setPairStatus("waiting");
      setPartnerEmail(inputEmail);
      onStatusChange();
    } else {
      alert(`Failed to initiate pairing: ${result.reason}`);
    }
  };

  const handleConfirmPairing = async () => {
    const result = await confirmPairing(partnerEmail);
    if (result.success) {
      setPairStatus("paired");
      onStatusChange();
    } else {
      alert(`Failed to confirm pairing: ${result.reason}`);
    }
  };

  const handleBreakup = async () => {
    const result = await breakupPairing();
    if (result.success) {
      setPairStatus("unpaired");
      setPartnerEmail("");
      onStatusChange();
    } else {
      alert("Failed to breakup. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button isIconOnly onPress={onOpen} color="default" aria-label="Settings">
        <Settings />
      </Button>
      <div onClick={onOpen}></div>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Partner Settings</ModalHeader>
              <ModalBody>
                {pairStatus === "unpaired" && (
                  <>
                    <p>Enter your partner's email to start pairing:</p>
                    <Input
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      placeholder="Partner's email"
                    />
                    <Button color="primary" onPress={handleAddPartner}>
                      Add Partner
                    </Button>
                  </>
                )}
                {pairStatus === "waiting" && (
                  <>
                    <p>Waiting for {partnerEmail} to confirm the pairing.</p>
                    <Button color="primary" onPress={handleConfirmPairing}>
                      Confirm Pairing
                    </Button>
                  </>
                )}
                {pairStatus === "paired" && (
                  <>
                    <p>You are paired with: {partnerEmail}👩‍❤️‍👨</p>
                    <Button color="danger" onPress={handleBreakup}>
                      Breakup🥲
                    </Button>
                  </>
                )}
                {pairStatus === "error" && (
                  <p>An error occurred. Please try again later.</p>
                )}
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
