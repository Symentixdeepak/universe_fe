import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { TextField, SvgIcon, Chip } from "../index";
import { useThemeColors } from "../../hooks/useThemeColors";
import {
  AssistantChatProvider,
  useAssistantChat,
} from "../../contexts/AssistantChatContext";

interface ChatMessage {
  id: string;
  parentMessageId: string;
  role: "HUMAN" | "AI";
  message: string;
}

interface AssistantChatProps {
  onConnectDrMaya?: () => void;
  onViewProfile?: () => void;
}

const AssistantChatContent: React.FC<AssistantChatProps> = ({
  onConnectDrMaya,
  onViewProfile,
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<{
    [messageId: string]: string;
  }>({});
  const [pendingCarouselUpdate, setPendingCarouselUpdate] = useState<{
    parentId: string;
    messageId: string;
  } | null>(null);
  const [retryingParentId, setRetryingParentId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const {
    messages,
    setMessages,
    conversationId,
    setConversationId,
    loading,
    setLoading,
    getResponsesByParentId,
    currentResponseIndex,
    setCurrentResponseIndex,
    navigateResponse,
  } = useAssistantChat();

  // Handle carousel navigation after retry
  useEffect(() => {
    if (pendingCarouselUpdate) {
      const { parentId, messageId } = pendingCarouselUpdate;

      // Find the index of the new message
      const allResponses = getResponsesByParentId(parentId);
      const newIndex = allResponses.findIndex((m) => m.id === messageId);

      console.log(
        "Setting carousel index - AllResponses:",
        allResponses.length,
        "NewIndex:",
        newIndex
      );

      if (newIndex !== -1) {
        setCurrentResponseIndex((prev) => ({
          ...prev,
          [parentId]: newIndex,
        }));
      }

      setPendingCarouselUpdate(null);
    }
  }, [
    pendingCarouselUpdate,
    messages,
    getResponsesByParentId,
    setCurrentResponseIndex,
  ]);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [messages.length]);

  // Initial scroll on component mount
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, []);

  const generateId = () => crypto.randomUUID();

  // Typewriter effect function
  const startTypewriterEffect = (messageId: string, fullText: string) => {
    console.log(
      "Starting typewriter for message:",
      messageId,
      "Text:",
      fullText
    );
    setTypingMessageId(messageId);
    setDisplayedText((prev) => ({ ...prev, [messageId]: "" }));

    let charIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText((prev) => ({
          ...prev,
          [messageId]: fullText.substring(0, charIndex + 1),
        }));
        charIndex++;

        // Auto scroll during typing
        if (charIndex % 10 === 0) {
          setTimeout(() => {
            chatEndRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 50);
        }
      } else {
        clearInterval(typewriterInterval);
        setTypingMessageId(null);
        console.log("Typewriter complete for:", messageId);
      }
    }, 30);
  };

  const sendMessage = async (messageText?: string, parentId?: string) => {
    const trimmed = (messageText || inputValue).trim();
    if (!trimmed) return;

    const userMsgId = generateId();

    // If parentId is not provided, find the last HUMAN message's ID
    let finalParentId = parentId;
    if (!finalParentId) {
      const lastHumanMessage = [...messages]
        .reverse()
        .find((m) => m.role === "HUMAN");
      finalParentId = lastHumanMessage?.id || userMsgId;
    }

    const userMsg: ChatMessage = {
      id: userMsgId,
      parentMessageId: finalParentId,
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
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Start typewriter effect
      startTypewriterEffect(aiMsgId, aiMessage.message);

      // Scroll to new AI message immediately when it starts
      setTimeout(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 50);
    } catch (err: any) {
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
    if (!inputValue.trim() || loading || typingMessageId) return;
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Don't send if loading or typing
      if (!loading && !typingMessageId) {
        handleSendMessage();
      }
    }
  };

  const handleCopy = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      navigator.clipboard.writeText(message.message);
      
      // Show checkmark for 3 seconds
      setCopiedMessageId(messageId);
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 3000);
    }
  };

  const handleRetry = async (parentMessageId: string) => {
    // Find the parent HUMAN message to regenerate response
    const parentMessage = messages.find(
      (m) => m.id === parentMessageId && m.role === "HUMAN"
    );

    if (!parentMessage) return;

    // Set retrying state to show "Thinking..." at current response position
    setRetryingParentId(parentMessage.id);
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: parentMessage.message,
          conversationId: conversationId,
          parentMessageId: parentMessage.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();

      // Create new AI response with same parent ID (for carousel)
      const newAiMessage: ChatMessage = {
        id: Date.now().toString(),
        parentMessageId: parentMessage.id,
        role: "AI",
        message: data?.reply ?? "Sorry, no reply from assistant.",
      };

      // Add the new message
      setMessages((prev) => [...prev, newAiMessage]);

      // Schedule carousel update after message is added
      setPendingCarouselUpdate({
        parentId: parentMessage.id,
        messageId: newAiMessage.id,
      });

      // Start typewriter effect
      startTypewriterEffect(newAiMessage.id, newAiMessage.message);

      // Scroll to the new message
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
    } catch (error) {
      console.error("Error regenerating response:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        parentMessageId: parentMessage.id,
        role: "AI",
        message: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setRetryingParentId(null);
    }
  };

  const handleMenu = (messageId: string) => {
    console.log("Menu clicked for message:", messageId);
  };

  console.log({ isLoading: loading });
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
        }}
      >
        {(() => {
          const displayedMessages: any[] = [];
          const processedParents = new Set<string>();

          messages.forEach((message) => {
            if (message.role === "HUMAN") {
              displayedMessages.push(message);
            } else if (
              message.role === "AI" &&
              !processedParents.has(message.parentMessageId)
            ) {
              // For AI messages, only show the current response in carousel
              const responses = getResponsesByParentId(message.parentMessageId);
              if (responses.length > 0) {
                const currentIndex =
                  currentResponseIndex[message.parentMessageId] || 0;
                const currentResponse = responses[currentIndex];
                if (currentResponse) {
                  displayedMessages.push({
                    ...currentResponse,
                    _totalResponses: responses.length,
                    _currentIndex: currentIndex,
                  });
                  processedParents.add(message.parentMessageId);
                }
              }
            }
          });

          return displayedMessages.map((message) => (
            <Box
              key={message.id}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems:
                  message.role === "HUMAN" ? "flex-end" : "flex-start",
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
                  {typingMessageId === message.id ? (
                    <>
                      {displayedText[message.id] || ""}
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
                  ) : retryingParentId === message.parentMessageId &&
                    message.role === "AI" ? (
                    // Show "Thinking..." when retrying this response
                    <></>
                  ) : (
                    (() => {
                      const text = displayedText[message.id] || message.message;
                      if (message.role === "AI") {
                        console.log(
                          "Rendering AI message:",
                          message.id,
                          "TypingId:",
                          typingMessageId,
                          "DisplayedText:",
                          displayedText[message.id],
                          "FullText:",
                          message.message
                        );
                      }
                      return text;
                    })()
                  )}
                </Typography>
              </Box>
              <div style={{ display: "flex" }}>
                {/* Carousel Navigation for AI messages with multiple responses */}
                {message.role === "AI" &&
                  typingMessageId !== message.id &&
                  retryingParentId !== message.parentMessageId &&
                  message._totalResponses > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0,
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigateResponse(message.parentMessageId, "prev")
                        }
                      >
                        <ChevronLeftIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                      <Typography
                        variant="caption"
                        sx={{ color: themeColors.grey.main }}
                      >
                        {message._currentIndex + 1}/{message._totalResponses}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigateResponse(message.parentMessageId, "next")
                        }
                      >
                        <ChevronRightIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Box>
                  )}

                {/* Action Buttons for AI messages */}
                {message.role === "AI" &&
                  typingMessageId !== message.id &&
                  retryingParentId !== message.parentMessageId && (
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleCopy(message.id)}
                      >
                        {copiedMessageId === message.id ? (
                          <CheckIcon sx={{ fontSize: 18}} />
                        ) : (
                          <SvgIcon name="chat_copy" width={18} height={18} />
                        )}
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleRetry(message.parentMessageId)}
                      >
                        <SvgIcon name="chat_retry" width={18} height={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleMenu(message.id)}
                      >
                        <SvgIcon name="chat_dot" width={18} height={18} />
                      </IconButton>
                    </Box>
                  )}
              </div>
            </Box>
          ));
        })()}

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
                    cursor: loading || typingMessageId ? 'not-allowed' : 'pointer',
                    display: "flex",
                    alignItems: "center",
                    color: themeColors.pantone.main,
                    opacity: loading || typingMessageId ? 0.5 : 1,
                  }}
                  onClick={handleSendMessage}
                >
                  <ArrowCircleRightOutlinedIcon
                    sx={{ 
                      fontSize: 24, 
                      color: themeColors.pantone.main,
                      opacity: loading || typingMessageId ? 0.5 : 1,
                    }}
                  />
                </Box>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "auto",
                p: { xs: "5px 18px", md: "8px 30px" },
              },
            }}
            size="small"
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

// Wrapper component with Context Provider
const AssistantChat: React.FC<AssistantChatProps> = (props) => {
  return (
    <AssistantChatProvider>
      <AssistantChatContent {...props} />
    </AssistantChatProvider>
  );
};

export default AssistantChat;
