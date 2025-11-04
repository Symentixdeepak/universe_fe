import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, SvgIcon } from "@/components";
import { useThemeColors } from "@/hooks";
import ChatInput from "./ChatInput";
import MessageData from "./MessageData";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  avatar?: string;
}

interface MiddleContentProps {
  selectedConnectionId?: string;
  selectedConnection?: {
    id: string;
    name: string;
    avatar: string;
    status?: "online" | "offline";
  };
  onBackClick?: () => void;
  messages?: Message[];
}

const MiddleContent: React.FC<MiddleContentProps> = ({
  selectedConnectionId,
  selectedConnection = {
    id: "1",
    name: "Dr. Maya K.",
    avatar: "/dr_maya.png",
    status: "online",
  },
  onBackClick,
  messages = [
    {
      id: "1",
      text: "Hey there! How's your day going?",
      sender: "other",
      timestamp: "10:30 AM",
      avatar: "/dr_maya.png",
      name: "Aelia Kos",
      type:"image",
      image:"/assets/images/sample/chat_sample.png",
    },
    {
      id: "2",
      text: "Hi Maya! It's going great, thanks for asking. How about yours?",
      sender: "me",
      timestamp: "10:32 AM",
      name: "David Batani",
      avatar: "/assets/images/sample/david_batani.png",
    },
    {
      id: "3",
      text:
        "Pretty good! I just finished reviewing some documents you sent over. I'll let you know when I have time to review the rest. Talk soon! 👋",
      sender: "other",
      timestamp: "10:35 AM",
      avatar: "/dr_maya.png",
      name: "Aelia Kos",
    },
    {
      id: "4",
      text: "Perfect! Look forward to it.",
      sender: "me",
      timestamp: "10:36 AM",
      name: "David Batani",
      avatar: "/assets/images/sample/david_batani.png",
    },
    {
      id: "5",
      text: "Hey, David!",
      sender: "other",
      timestamp: "1:15 PM",
      avatar: "/dr_maya.png",
      name: "Aelia Kos",
    },
    {
      id: "6",
      text:
        "Hello, how's it going? Have you tried any new sushi places recently? I think business goes well with raw fish. But that's just me.",
      sender: "me",
      timestamp: "1:18 PM",
      name: "David Batani",
      avatar: "/assets/images/sample/david_batani.png",
    },
    {
      id: "7",
      text: "Hey, David!",
      sender: "other",
      timestamp: "1:15 PM",
      avatar: "/dr_maya.png",
      name: "Aelia Kos",
    },
    {
      id: "8",
      text:
        "Hello, how's it going? Have you tried any new sushi places recently? I think business goes well with raw fish. But that's just me.",
      sender: "me",
      timestamp: "1:18 PM",
      name: "David Batani",
      avatar: "/assets/images/sample/david_batani.png",
    },
  ],
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [inputMessage, setInputMessage] = useState("");
  const [prevConnectionId, setPrevConnectionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Handle initial load of messages for a connection
  useEffect(() => {
    if (selectedConnectionId && selectedConnectionId !== prevConnectionId) {
      setPrevConnectionId(selectedConnectionId);
      // Scroll to bottom when switching to a new connection
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [selectedConnectionId, prevConnectionId]);

  // Handle new messages added to existing conversation
  useEffect(() => {
    if (
      selectedConnectionId &&
      selectedConnectionId === prevConnectionId &&
      messages.length > 0
    ) {
      // Only scroll if user is near the bottom (within 100px)
      if (messagesContainerRef.current) {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = messagesContainerRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

        if (isNearBottom) {
          setTimeout(() => {
            scrollToBottom();
          }, 50);
        }
      }
    }
  }, [messages, selectedConnectionId, prevConnectionId]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Here you would typically add the message to your state or call an API
      console.log("Sending message:", inputMessage);
      setInputMessage("");
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: themeColors.white.main,
        minHeight: 0, // Allow flex children to shrink
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          display: {xs:"none",md:"flex"},

          padding: "16px 24px",
          borderBottom: `1px solid ${themeColors.white.dark}`,
          bgcolor: themeColors.white.main,
          maxWidth: 500,
        }}
      >
        {isMobile && (
          <IconButton onClick={onBackClick} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography
            variant="bodyBold"
            sx={{ color: themeColors.text.primary }}
          >
            {selectedConnection.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              sx={{
                height: 8,
                width: 8,
                borderRadius: 50,
                background: themeColors.pantone.light,
              }}
            />
            <Typography
              variant="subtitleLight"
              sx={{ color: themeColors.pantone.light }}
            >
              {selectedConnection.status === "online"
                ? "Available"
                : "Last seen recently"}
            </Typography>
          </Box>
        </Box>

        <IconButton sx={{ mt: -1 }}>
          <SvgIcon name="search_icon" width={24} height={24} />
        </IconButton>
      </Box>

      {/* Messages Area */}
      <Box
        ref={messagesContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          scrollBehavior: "smooth",
          minHeight: 0, // Allow the container to shrink properly
        }}
      >
        {messages.map((message) => (
          <MessageData key={message.id} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input Area */}
      <Box sx={{ flexShrink: 0 }}>
        <ChatInput
          themeColors={themeColors}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Box>
    </Box>
  );
};

export default MiddleContent;
