"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { MessageSquareHeart, Phone, Video } from "lucide-react";
import { Peer } from 'peerjs';

interface ChatModalProps {
  peer: Peer | null;
  conn: Peer.DataConnection | null;
}

export default function ChatModal({ peer, conn }: ChatModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'them' }[]>([]);

  useEffect(() => {
    // Load messages from localStorage
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessages = [...messages, { text: messageInput, sender: 'me' }];
      setMessages(newMessages);
      setMessageInput("");
      if (typeof window !== "undefined") {
        localStorage.setItem("chatMessages", JSON.stringify(newMessages));
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 h-screen">
      <Button isIconOnly color="danger" aria-label="Chat" onClick={onOpen} disabled={!conn}>
        <MessageSquareHeart />
      </Button>

      <Modal
        isDismissable={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="full"
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                <span>Chat Mode</span>
                <div className="flex space-x-2">
                  <Button color="danger" variant="light" onPress={onClose} aria-label="RTC phone call">
                    <Phone />
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose} aria-label="RTC video call">
                    <Video />
                  </Button>
                </div>
              </ModalHeader>
              <ModalBody className="flex flex-col justify-between h-full">
                <div className="overflow-y-auto max-h-60">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex items-center ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
                      <div className={`p-2 rounded-md ${msg.sender === 'me' ? 'bg-gray-200 text-black' : 'bg-blue-200 text-black'} max-w-xs`}>
                        
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-auto">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded-md"
                  />
                  <Button onPress={handleSendMessage} color="primary" className="ml-2">
                    Send
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
               <p className="text-sm text-center">🔒 This chat is end-to-end encrypted for your privacy.🌟</p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}