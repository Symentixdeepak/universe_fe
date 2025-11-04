import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import { SvgIcon, TextField } from "@/components";
import { toastService } from "@/lib/toast";

interface AttachedFile {
  id: string;
  file: File;
  type: "image" | "document";
  preview?: string;
}

interface ChatInputProps {
  themeColors: any;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  themeColors,
  inputMessage,
  setInputMessage,
  handleSendMessage,
}) => {
  const [
    attachmentAnchor,
    setAttachmentAnchor,
  ] = useState<HTMLButtonElement | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachmentClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAttachmentAnchor(event.currentTarget);
  };

  const handleAttachmentClose = () => {
    setAttachmentAnchor(null);
  };

  const validateFileSize = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toastService.error(
        `File "${file.name}" is too large. Maximum size is 5MB.`
      );
      return false;
    }
    return true;
  };

  const handleImageSelect = () => {
    imageInputRef.current?.click();
    handleAttachmentClose();
  };

  const handleDocumentSelect = () => {
    documentInputRef.current?.click();
    handleAttachmentClose();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (validateFileSize(file)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const newFile: AttachedFile = {
              id:
                Date.now().toString() + Math.random().toString(36).substr(2, 9),
              file,
              type: "image",
              preview: e.target?.result as string,
            };
            setAttachedFiles((prev) => [...prev, newFile]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
    // Reset input
    event.target.value = "";
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (validateFileSize(file)) {
          const newFile: AttachedFile = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file,
            type: "document",
          };
          setAttachedFiles((prev) => [...prev, newFile]);
        }
      });
    }
    // Reset input
    event.target.value = "";
  };

  const removeAttachedFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const open = Boolean(attachmentAnchor);

  return (
    <Box
      sx={{
        padding: "16px 20px",
        borderTop: `1px solid ${themeColors.white.dark}`,
        bgcolor: themeColors.white.main,
        minHeight: "auto",
      }}
    >
      {/* File Previews */}
      {attachedFiles.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {attachedFiles.map((file) => (
            <Card
              key={file.id}
              sx={{
                mb: 1,
                bgcolor: themeColors.white.main,
                boxShadow: 1,
                position: "relative",
              }}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {file.type === "image" && file.preview ? (
                    <Avatar
                      src={file.preview}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: themeColors.pantone.light,
                      }}
                    >
                      <DescriptionIcon sx={{ color: themeColors.white.main }} />
                    </Avatar>
                  )}

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="bodyRegular"
                      sx={{
                        color: themeColors.text.primary,
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {file.file.name}
                    </Typography>
                    <Typography
                      variant="subtitleLight"
                      sx={{
                        color: themeColors.text.secondary,
                        fontSize: "12px",
                        ml: 2,
                      }}
                    >
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() => removeAttachedFile(file.id)}
                    sx={{ color: themeColors.text.secondary }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Text Input */}
      <TextField
        fullWidth
        multiline
        maxRows={3}
        placeholder="Your Message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          sx: {
            minHeight: "auto",
            "& .MuiInputBase-input": {
              resize: "none",
              overflow: "auto !important",
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() && attachedFiles.length === 0}
                sx={{
                  color:
                    inputMessage.trim() || attachedFiles.length > 0
                      ? themeColors.pantone.main
                      : themeColors.text.secondary,
                }}
              >
                <SvgIcon
                  style={{
                    opacity:
                      !inputMessage.trim() && attachedFiles.length === 0
                        ? 0.4
                        : 1,
                  }}
                  name="send_icon"
                  width={22}
                  height={22}
                />
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleAttachmentClick}>
                <SvgIcon name="attach" width={22} height={22} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ 
          "& .MuiOutlinedInput-root": {
            height: "auto",

          },
        }}
        size="small"
      />

      {/* Attachment Popover */}
      <Popover
        open={open}
        anchorEl={attachmentAnchor}
        onClose={handleAttachmentClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: "8px",
            // minWidth: 160,
            boxShadow: 3,
          },
        }}
      >
        <List sx={{ p: 1 }}>
          <ListItemButton
            onClick={handleImageSelect}
            sx={{
              borderRadius: "10px",
              "&:hover": {
                bgcolor: themeColors.white.dark,
                "& .MuiListItemIcon-root .MuiSvgIcon-root": {
                  color: themeColors.pantone.main,
                },
                "& .MuiListItemText-primary": {
                  color: themeColors.pantone.main,
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 25 }}>
              <AddPhotoAlternateOutlinedIcon
                sx={{ color: themeColors.text.primary, fontSize: 16 }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Image"
              primaryTypographyProps={{
                variant: "subtitleRegular",
                sx: { color: themeColors.text.primary },
              }}
            />
          </ListItemButton>

          <ListItemButton
            onClick={handleDocumentSelect}
            sx={{
              borderRadius: "10px",
              "&:hover": {
                bgcolor: themeColors.white.dark,
                "& .MuiListItemIcon-root .MuiSvgIcon-root": {
                  color: themeColors.pantone.main,
                },
                "& .MuiListItemText-primary": {
                  color: themeColors.pantone.main,
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 25 }}>
              <SummarizeOutlinedIcon
                sx={{ color: themeColors.text.primary, fontSize: 16 }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Document"
              primaryTypographyProps={{
                variant: "subtitleRegular",
                sx: { color: themeColors.text.primary },
              }}
            />
          </ListItemButton>
        </List>
      </Popover>

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <input
        ref={documentInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        style={{ display: "none" }}
        onChange={handleDocumentChange}
      />
    </Box>
  );
};

export default ChatInput;
