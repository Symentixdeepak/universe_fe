import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Button, Chip, TextField, SvgIcon } from "@/components";
import { useThemeColors } from "@/hooks";
import Image from "next/image";
import { useSidebar } from "@/contexts/SideBarContext";
import ConnectionFound from "./ConnectionFound";
import { useRouter } from "next/router";

interface Message {
  id: string;
  type: "system" | "user";
  content: string;
}

export const Chat = ({ setShowChat }) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { isSidebarExpanded, toggleSidebar } = useSidebar();

  const chatEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [showConnectionFound, setShowConnectionFound] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: `Great refinement — I've found a strong match for you. Meet Dr. Maya K., a Toronto-based entrepreneur and researcher specializing in AI applications for healthcare. She's the founder of a health-tech startup that uses machine learning to improve patient outcomes, and she's passionate about mentoring professionals who want to apply AI in meaningful ways. Given your interest in leaders with startup experience and a focus on healthcare, Dr. Maya could be an excellent first connection. Would you like me to arrange an introduction?`,
    },
    {
      id: "2",
      type: "user",
      content: `Thanks, that’s really helpful. I’d like to narrow it down further to leaders working specifically in AI for healthcare or education. Ideally, they’d have experience in startups or early-stage projects, and be open to mentorship or collaboration opportunities. If possible, I’d also prefer connections based in Toronto or Vancouver.`,
    },
    {
      id: "3",
      type: "system",
      content: `Great refinement — I've found a strong match for you. Meet Dr. Maya K., a Toronto-based entrepreneur and researcher specializing in AI applications for healthcare. She's the founder of a health-tech startup that uses machine learning to improve patient outcomes, and she's passionate about mentoring professionals who want to apply AI in meaningful ways. Given your interest in leaders with startup experience and a focus on healthcare, Dr. Maya could be an excellent first connection. Would you like me to arrange an introduction?`,
    },
  ]);

  // Auto scroll to bottom only when chat is visible (not showing ConnectionFound)
  useEffect(() => {
    if (!showConnectionFound && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showConnectionFound]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "user", content: inputValue },
    ]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAcceptConnection = () => {
    // Handle accepting the connection
    router.push("/user/my-universe/1");
  };

  const handleDeclineConnection = () => {
    // Handle declining the connection
    setShowConnectionFound(false);
    setShowChat(false);
    router.push("/user/dashboard");
  };

  if (showConnectionFound) {
    return (
      <ConnectionFound
        onAccept={handleAcceptConnection}
        onDecline={handleDeclineConnection}
      />
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "680px",
        margin: "0 auto",
        bgcolor: themeColors.background.primary,
        // pt: "62px", // leave space at top
        pb: "10px", // leave space at bottom
        minHeight: "100vh",
        boxSizing: "border-box",

        padding: { xs: 3, md: 0 },
      }}
    >
      {/* Chat Messages (main scroll area) */}
      <Box
        sx={{
          // px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: message.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                bgcolor:
                  message.type === "user"
                    ? {
                        xs: themeColors.pantone.main,
                        md: themeColors.white.dark,
                      }
                    : themeColors.background.primary,
                p: message.type === "user" ? "14px 20px" : 0,
                borderBottomLeftRadius: message.type === "user" ? "20px" : 0,
                borderTopRightRadius: message.type === "user" ? "20px" : 0,
                borderTopLeftRadius: message.type === "user" ? "20px" : 0,
                maxWidth: message.type === "user" ? "320px" : "90%",
                boxShadow:
                  message.type === "user"
                    ? "0px 1px 3px rgba(0,0,0,0.1)"
                    : "none",
              }}
            >
              <Typography
                variant="bodyLight"
                sx={{
                  color: {
                    xs:
                      message.type === "user"
                        ? themeColors.white.main
                        : themeColors.text.primary,
                    md: themeColors.text.primary,
                  },
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.content}
              </Typography>
            </Box>

            {message.type === "system" && (
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <IconButton size="small">
                  <SvgIcon name="chat_copy" width={20} height={20} />
                </IconButton>
                <IconButton size="small">
                  <SvgIcon name="chat_retry" width={20} height={20} />
                </IconButton>
                <IconButton size="small">
                  <SvgIcon name="chat_dot" width={20} height={20} />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>

      {/* Fixed Bottom Input */}
      {/* Fixed Bottom Input */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: isSidebarExpanded ? "185px" : 0, // ← dynamically offset when sidebar expanded
          right: 0,
          px: { xs: 2, md: 4 },
          py: 2,
          bgcolor: themeColors.background.primary,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          gap: 2,
          transition: "left 0.3s ease", // smooth animation when toggling sidebar
          zIndex: 10, // keep above other content
        }}
      >
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <Chip
            label="Connect with Dr. Maya K"
            variant="outlined"
            onClick={() => setShowConnectionFound(true)}
          />
          <Chip label="View Amelia's Profile" variant="outlined" />
        </Box>

        <Box sx={{ width: "100%", maxWidth: "680px" }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder={isMobile ? "Describe the connection you are looking for" : "Describe the connection or person you are looking for."}
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
                >
                  <ArrowCircleRightOutlinedIcon
                    sx={{ fontSize: 24, color: themeColors.pantone.main }}
                  />
                </Box>
              ),
            }}
          />
          <Typography
            variant="captionLight"
            sx={{
              color: themeColors.grey.main,
              textAlign: "center",
              display: {xs:"none", md:"block"},
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

export default Chat;
