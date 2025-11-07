import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { TextField, SvgIcon, Chip } from "../index";
import { useThemeColors } from "../../hooks/useThemeColors";

interface ChatMessage {
  id: string;
  parentMessageId: string;
  role: "HUMAN" | "AI";
  message: string;
  isStreaming?: boolean;
  displayedMessage?: string;
}

interface AssistantChatProps {
  onConnectDrMaya?: () => void;
  onViewProfile?: () => void;
}

const AssistantChat: React.FC<AssistantChatProps> = ({
  onConnectDrMaya,
  onViewProfile,
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      parentMessageId: "1",
      role: "AI",
      message:
        "Great choice — Canada has a growing community of innovators shaping the future of technology. Based on your interests, I've identified several potential connections who align with your goals:\n\n• Amelia R. - CTO at a Toronto-based AI startup, passionate about ethical AI and global collaboration.\n• David M. - Senior Product Manager in Vancouver, with experience in health tech and international collaboration.\n• Sofia L. - Researcher in Montreal specializing in human-centered design and emerging technologies.\n\nEach of them values meaningful professional relationships and is open to sharing insights within the tech community. I can introduce you to Amelia first, since her interests in AI and innovation closely match your profile. Would you like me to start there?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Typewriter effect for streaming messages
  useEffect(() => {
    const streamingMessage = messages.find((m) => m.isStreaming);
    if (!streamingMessage) return;

    const targetText = streamingMessage.message;
    const currentText = streamingMessage.displayedMessage || "";

    if (currentText.length < targetText.length) {
      const timeout = setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamingMessage.id
              ? {
                  ...m,
                  displayedMessage: targetText.slice(0, currentText.length + 1),
                }
              : m
          )
        );

        // Auto-scroll during streaming (less frequent to avoid performance issues)
        if (chatEndRef.current && currentText.length % 10 === 0) {
          // Scroll every 10 characters
          chatEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center", // Use center instead of end to avoid overlap
          });
        }
      }, Math.random() * 20 + 20); // Random speed between 20-40ms for more natural typing

      return () => clearTimeout(timeout);
    } else {
      // Streaming complete
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingMessage.id
            ? { ...m, isStreaming: false, displayedMessage: undefined }
            : m
        )
      );
    }
  }, [messages]);

  // Auto scroll to bottom when new messages are added (not during streaming)
  useEffect(() => {
    const hasStreamingMessage = messages.some((m) => m.isStreaming);

    // Only auto-scroll when not streaming (to avoid competing with streaming scroll)
    if (!hasStreamingMessage && chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center", // Use center to avoid overlap with fixed input
        });
      }, 100);
    }
  }, [messages.length]); // Only trigger when message count changes, not during streaming updates

  // Initial scroll on component mount
  useEffect(() => {
    if (chatEndRef.current) {
      // Immediate scroll on first render to ensure proper positioning
      chatEndRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, []);

  const generateId = () => crypto.randomUUID();

  const sendMessage = async (messageText?: string, parentId?: string) => {
    const trimmed = (messageText || inputValue).trim();
    if (!trimmed) return;

    const userMsgId = generateId();
    const lastMessage = messages[messages.length - 1];

    const userMsg: ChatMessage = {
      id: userMsgId,
      parentMessageId: parentId || lastMessage?.id || userMsgId,
      role: "HUMAN",
      message: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInputValue("");
    setLoading(true);

    try {
      const body = {
        conversationId: conversationId,
        parentMessageId: userMsg.parentMessageId,
        message: trimmed,
      };

      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "AI API error");
      }

      const data = await res.json();
      const aiMsgId = generateId();

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      const aiMessage: ChatMessage = {
        id: aiMsgId,
        parentMessageId: userMsgId,
        role: "AI",
        message: data?.reply ?? "Sorry, no reply from assistant.",
        isStreaming: true,
        displayedMessage: "",
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Scroll to new AI message immediately when it starts
      setTimeout(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center", // Use center to provide proper spacing
          });
        }
      }, 50);
    } catch (err) {
      const errorMsgId = generateId();
      const errorMessage: ChatMessage = {
        id: errorMsgId,
        parentMessageId: userMsgId,
        role: "AI",
        message: `Error: ${err?.message || err}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      navigator.clipboard.writeText(message.message);
    }
  };

  const handleRetry = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message && message.role === "AI") {
      const parentMessage = messages.find(
        (m) => m.id === message.parentMessageId
      );
      if (parentMessage && parentMessage.role === "HUMAN") {
        setMessages((prev) => prev.filter((m) => m.id !== messageId));
        sendMessage(parentMessage.message, parentMessage.parentMessageId);
      }
    }
  };

  const handleMenu = (messageId: string) => {
    console.log("Menu clicked for message:", messageId);
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "680px",
        margin: "0 auto",
        bgcolor: themeColors.background.primary,
        pt: "80px", // Add top padding for navbar
        pb: "120px", // Increase bottom padding for fixed input area
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: { xs: "80px 24px 50px 24px", md: "80px 0 100px 0" },
      }}
    >
      {/* Chat Messages */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          //   mb: 4, // Add margin bottom to ensure last message isn't too close to fixed input
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: message.role === "HUMAN" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                bgcolor:
                  message.role === "HUMAN"
                    ? {
                        xs: themeColors.pantone.main,
                        md: themeColors.white.dark,
                      }
                    : themeColors.background.primary,
                p: message.role === "HUMAN" ? "14px 20px" : 0,
                borderBottomLeftRadius: message.role === "HUMAN" ? "20px" : 0,
                borderTopRightRadius: message.role === "HUMAN" ? "20px" : 0,
                borderTopLeftRadius: message.role === "HUMAN" ? "20px" : 0,
                maxWidth: message.role === "HUMAN" ? "320px" : "90%",
                boxShadow:
                  message.role === "HUMAN"
                    ? "0px 1px 3px rgba(0,0,0,0.1)"
                    : "none",
              }}
            >
              <Typography
                variant="bodyLight"
                sx={{
                  color: {
                    xs:
                      message.role === "HUMAN"
                        ? themeColors.white.main
                        : themeColors.text.primary,
                    md: themeColors.text.primary,
                  },
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.isStreaming ? (
                  <>
                    {message.displayedMessage || ""}
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        width: "2px",
                        height: "1.2em",
                        backgroundColor: themeColors.text.primary,
                        marginLeft: "1px",
                        animation: "blink 1s infinite",
                        "@keyframes blink": {
                          "0%, 50%": { opacity: 1 },
                          "51%, 100%": { opacity: 0 },
                        },
                      }}
                    />
                  </>
                ) : (
                  message.message
                )}
              </Typography>
            </Box>

            {message.role === "AI" && !message.isStreaming && (
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <IconButton size="small" onClick={() => handleCopy(message.id)}>
                  <SvgIcon name="chat_copy" width={20} height={20} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleRetry(message.id)}
                >
                  <SvgIcon name="chat_retry" width={20} height={20} />
                </IconButton>
                <IconButton size="small" onClick={() => handleMenu(message.id)}>
                  <SvgIcon name="chat_dot" width={20} height={20} />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}

        {/* Typing indicator while waiting for response */}
        {loading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                bgcolor: themeColors.background.primary,
                p: "14px 20px",
                borderRadius: "20px",
                maxWidth: "90%",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: themeColors.text.primary,
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    animation: "dots 1.5s infinite",
                    "@keyframes dots": {
                      "0%, 20%": { content: '"Thinking"' },
                      "40%": { content: '"Thinking."' },
                      "60%": { content: '"Thinking.."' },
                      "80%, 100%": { content: '"Thinking..."' },
                    },
                  }}
                >
                  Thinking...
                </Box>
              </Typography>
            </Box>
          </Box>
        )}

        <div ref={chatEndRef} style={{ height: "80px" }} />
      </Box>

      {/* Fixed Bottom Input */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          px: { xs: 2, md: 4 },
          py: 2, // Increase padding for better spacing
          bgcolor: themeColors.background.primary,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          gap: 2,
          zIndex: 1000, // Higher z-index to ensure it stays above content
        }}
      >
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <Chip
            label="Connect with Dr. Maya K"
            variant="outlined"
            onClick={onConnectDrMaya}
          />
          <Chip
            label="View Amelia's Profile"
            variant="outlined"
            onClick={onViewProfile}
          />
        </Box>

        <Box sx={{ width: "100%", maxWidth: "680px" }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder={
              isMobile
                ? "Describe connection you are looking for"
                : "Describe the connection or person you are looking for."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <Box
                  component="div"
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: themeColors.pantone.main,
                  }}
                  onClick={handleSendMessage}
                >
                  <ArrowCircleRightOutlinedIcon
                    sx={{ fontSize: 24, color: themeColors.pantone.main }}
                  />
                </Box>
              ),
            }}
              sx={{ 
          "& .MuiOutlinedInput-root": {
            height: "auto",
            p:{xs:"5px 18px", md:"10px 40px"}

          },
        }} size="small"
          />
          <Typography
            variant="captionLight"
            sx={{
              color: themeColors.grey.main,
              textAlign: "center",
              display: { xs: "none", md: "block" },
              mt: 1,
            }}
          >
            The UniVerse will do its best to find the best person for you, but
            your due diligence is advised.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AssistantChat;
