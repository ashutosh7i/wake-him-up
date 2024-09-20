"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import {Badge} from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import {
  MessageSquareHeart,
  Phone,
  Video,
  PhoneOff,
  Mic,
  MicOff,
} from "lucide-react";
import { Peer, DataConnection, MediaConnection } from "peerjs";

interface ChatModalProps {
  peer: Peer | null;
  conn: DataConnection | null;
  onStatusChange: (status: string) => void;
  buttonClassName?: string;
}

const SYSTEM_MESSAGES = ["WAKE_UP", "WOKE_UP", "CALL_ENDED", "CALL_DECLINED","WAKE_UP_REJECTED","WAKE_UP_CONFIRMED"];

interface Message {
  text: string;
  sender: "me" | "them";
  isSystem: boolean;
}

export default function ChatModal({ peer, conn, onStatusChange, buttonClassName = "" }: ChatModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const [callDuration, setCallDuration] = useState(0);
  const callIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeCallRef = useRef<MediaConnection | null>(null);
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  const [callStatus, setCallStatus] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageAudioRef = useRef<HTMLAudioElement | null>(null);

  const updateStatus = useCallback((status: string) => {
    if (onStatusChange && typeof onStatusChange === 'function') {
      onStatusChange(status);
    }
  }, [onStatusChange]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      ringtoneRef.current = new Audio("/ringtone.mp3");
      ringtoneRef.current.loop = true;
      messageAudioRef.current = new Audio("/message.mp3");
    }

    if (conn) {
      conn.on("data", handleIncomingMessage);
    }

    if (peer) {
      peer.on("call", handleIncomingCall);
    }

    return () => {
      if (conn) {
        conn.off("data", handleIncomingMessage);
      }
      if (peer) {
        peer.off("call", handleIncomingCall);
      }
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
      }
    };
  }, [conn, peer]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isInCall) {
      callIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      updateStatus("In call");
    } else {
      if (callIntervalRef.current) {
        clearInterval(callIntervalRef.current);
      }
      setCallDuration(0);
      updateStatus("Connected");
    }

    return () => {
      if (callIntervalRef.current) {
        clearInterval(callIntervalRef.current);
      }
    };
  }, [isInCall, updateStatus]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleIncomingMessage = useCallback((data: any) => {
    if (typeof data === "string") {
      const isSystemMessage = SYSTEM_MESSAGES.includes(data);
      if (data === "CALL_ENDED") {
        endCall();
      } else if (data === "CALL_DECLINED") {
        setCallStatus("Call declined");
        updateStatus("Connected");
        setTimeout(() => setCallStatus(null), 3000);
      } else if (data === "TYPING_START") {
        setIsTyping(true);
      } else if (data === "TYPING_END") {
        setIsTyping(false);
      } else {
        const newMessage: Message = {
          text: data,
          sender: "them",
          isSystem: isSystemMessage,
        };
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
          return updatedMessages;
        });
        if (!isOpen && !isSystemMessage) {
          setUnreadMessages((prev) => prev + 1);
          updateStatus("New message");
          if (messageAudioRef.current) {
            messageAudioRef.current.play().catch(e => console.error("Error playing message sound:", e));
          }
        }
      }
    }
  }, [isOpen, updateStatus]);

  const handleSendMessage = () => {
    if (messageInput.trim() && conn) {
      const newMessage: Message = {
        text: messageInput,
        sender: "me",
        isSystem: false,
      };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      conn.send(messageInput);
      setMessageInput("");
      conn.send("TYPING_END");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
    if (conn) {
      conn.send("TYPING_START");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        conn.send("TYPING_END");
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const startCall = async () => {
    if (peer && conn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const call = peer.call(conn.peer, stream);
        setCallStatus("Calling...");
        updateStatus("Calling...");
        activeCallRef.current = call;
        handleCallStream(call, stream);

        // Set a timeout to clear the "Calling..." status if the call isn't answered
        setTimeout(() => {
          if (callStatus === "Calling...") {
            setCallStatus(null);
            updateStatus("Connected");
          }
        }, 30000); // 30 seconds timeout
      } catch (err) {
        console.error("Failed to get local stream", err);
        setCallStatus(null);
        updateStatus("Connected");
      }
    }
  };

  const handleIncomingCall = (call: MediaConnection) => {
    setIncomingCall(call);
    updateStatus("Incoming call");
    if (ringtoneRef.current) {
      ringtoneRef.current.play().catch(e => console.error("Error playing ringtone:", e));
    }
  };

  const answerCall = async () => {
    if (incomingCall) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        incomingCall.answer(stream);
        setIsInCall(true);
        setCallStatus("In call");
        activeCallRef.current = incomingCall;
        handleCallStream(incomingCall, stream);
      } catch (err) {
        console.error("Failed to get local stream", err);
      }
    }
    setIncomingCall(null);
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };

  const declineCall = () => {
    if (incomingCall) {
      incomingCall.close();
    }
    setIncomingCall(null);
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
    if (conn) {
      conn.send("CALL_DECLINED");
    }
    setCallStatus("Call declined");
    updateStatus("Connected");
    setTimeout(() => setCallStatus(null), 3000);
  };

  const handleCallStream = (call: MediaConnection, localStream: MediaStream) => {
    if (localAudioRef.current) {
      localAudioRef.current.srcObject = localStream;
    }

    call.on("stream", (remoteStream) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream;
      }
      setIsInCall(true);
      setCallStatus("In call");
    });

    call.on("close", () => {
      endCall();
    });
  };

  const endCall = () => {
    setIsInCall(false);
    setCallStatus("Call ended");
    updateStatus("Connected");
    setTimeout(() => setCallStatus(null), 3000);
    if (activeCallRef.current) {
      activeCallRef.current.close();
    }
    if (localAudioRef.current) {
      const stream = localAudioRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
      localAudioRef.current.srcObject = null;
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
    }
    if (conn) {
      conn.send("CALL_ENDED");
    }
    activeCallRef.current = null;
  };

  const toggleMute = () => {
    if (localAudioRef.current && localAudioRef.current.srcObject) {
      const audioTrack = (localAudioRef.current.srcObject as MediaStream).getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadMessages(0);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2">
      <Badge content={unreadMessages} color="danger" isInvisible={unreadMessages === 0}>
        <Button
          isIconOnly
          aria-label="Chat"
          color="danger"
          disabled={!conn}
          onClick={() => {
            onOpen();
            if (ringtoneRef.current) {
              ringtoneRef.current.play().catch(e => console.error("Error playing ringtone:", e));
              ringtoneRef.current.pause();
              ringtoneRef.current.currentTime = 0;
            }
          }}
          className={buttonClassName}
        >
          <MessageSquareHeart />
        </Button>
      </Badge>

      <Modal
        backdrop="blur"
        isDismissable={true}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        placement="center"
        scrollBehavior="inside"
        size="full"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                <span>Chat Mode</span>
                <div className="flex space-x-2">
                  {!isInCall && (
                    <Button
                      aria-label="Start voice call"
                      color="success"
                      variant="light"
                      onPress={startCall}
                    >
                      <Phone />
                    </Button>
                  )}
                  <Button
                    aria-label="RTC video call"
                    color="primary"
                    variant="light"
                    onPress={onClose}
                  >
                    <Video />
                  </Button>
                </div>
              </ModalHeader>
              <ModalBody className="flex flex-col p-0">
                {callStatus && (
                  <div className="bg-gray-200 p-2 text-center">{callStatus}</div>
                )}
                <div className="flex-grow overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
                  {messages.filter(msg => !msg.isSystem).map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      } mb-2`}
                    >
                      <div
                        className={`p-2 rounded-md ${
                          msg.sender === "me"
                            ? "bg-gray-200 text-black"
                            : "bg-blue-200 text-black"
                        } max-w-xs`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                {isTyping && (
                  <div className="text-sm text-gray-500 italic p-2">
                    Partner is typing...
                  </div>
                )}
                <div className="flex p-4 bg-gray-100">
                  <input
                    className="flex-grow p-2 border rounded-md"
                    placeholder="Type your message..."
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    className="ml-2"
                    color="primary"
                    onPress={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <p className="text-sm text-center">
                  🔒 This chat is end-to-end encrypted for your privacy.🌟
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        className="z-50"
        isOpen={incomingCall !== null}
        onClose={declineCall}
        backdrop="blur"
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
      >
        <ModalContent>
          <ModalHeader>Incoming Call</ModalHeader>
          <ModalBody>
            <p>You have an incoming voice call.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={declineCall}>
              Decline
            </Button>
            <Button color="success" onPress={answerCall}>
              Answer
            </Button>
          </ModalFooter> 
        </ModalContent>
      </Modal>

      {isInCall && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
          <div>Call Duration: {formatDuration(callDuration)}</div>
          <div className="flex space-x-4">
            <Button
              isIconOnly
              aria-label="Toggle Mute"
              color={isMuted ? "warning" : "success"}
              variant="light"
              onPress={toggleMute}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button
              isIconOnly
              aria-label="End Call"
              color="danger"
              variant="light"
              onPress={endCall}
            >
              <PhoneOff />
            </Button>
          </div>
        </div>
      )}

      <audio ref={localAudioRef} autoPlay muted>
        <track kind="captions" />
      </audio>
      <audio ref={remoteAudioRef} autoPlay>
        <track kind="captions" />
      </audio>
    </div>
  );
}
