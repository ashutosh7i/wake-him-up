import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Settings } from "lucide-react";

import {
  getPairStatus,
  initiatePairing,
  confirmPairing,
  breakupPairing,
  getCurrentUserEmail,
  logout,
} from "@/config/appwrite";

interface SettingsModalProps {
  onStatusChange: () => void;
  buttonClassName?: string;
}

export default function SettingsModal({
  onStatusChange,
  buttonClassName = "",
}: SettingsModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pairStatus, setPairStatus] = useState<
    "unpaired" | "waiting" | "paired" | "error"
  >("unpaired");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchPairStatus();
      fetchCurrentUserEmail();
    }
  }, [isOpen]);

  const fetchCurrentUserEmail = async () => {
    const email = await getCurrentUserEmail();
    setCurrentUserEmail(email || ""); // Use an empty string if email is null
  };

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
    const confirmBreakup = window.confirm("Do you confirm you want to break up?");
    if (confirmBreakup) {
      const userInput = prompt("Please enter 'break up' to confirm:");
      if (userInput === "break up") {
        const result = await breakupPairing();

        if (result.success) {
          setPairStatus("unpaired");
          setPartnerEmail("");
          onStatusChange();
        } else {
          alert("Failed to breakup. Please try again.");
        }
      } else {
        alert("Breakup not confirmed. Please enter the exact text to proceed.");
      }
    }
  };
  
  const handleLogout = async () => {
    await logout();
    onStatusChange();
    onOpenChange();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        isIconOnly
        aria-label="Settings"
        className={buttonClassName}
        color="default"
        onPress={onOpen}
      >
        <Settings />
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Partner Settings
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between items-center">
                  <p>Your email: {currentUserEmail}</p>
                  <Button size="sm" color="danger" onPress={handleLogout}>
                    Logout
                  </Button>
                </div>
                {pairStatus === "unpaired" && (
                  <>
                    <p className="text-blue-600 text-sm">1. Ask your partner to install "Wake Them Up".</p>
                    <p className="text-blue-600 text-sm">2. Ask them to sign up and share their email.</p>
                    <p className="text-blue-600 text-sm">3. Paste their email below and click "Add Partner".</p>
                    <p className="text-blue-600 text-sm">4. Once sent, click "Confirm Pairing" again.</p>
                    <p className="text-blue-600 text-sm">5. It will show "paired" once confirmed.</p>
                    <Input
                      placeholder="Partner's email"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                    <Button color="primary" onPress={handleAddPartner}>
                      Add Partner
                    </Button>
                  </>
                )}
                {pairStatus === "waiting" && (
                  <>
                  <p className="text-blue-600 text-sm">1. Click "Confirm Pairing".</p>
                  <p className="text-blue-600 text-sm">2. Ask your partner to click "Confirm Pairing".</p>
                  <p className="text-blue-600 text-sm">3. It will show "paired" once confirmed both ways.</p>
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
