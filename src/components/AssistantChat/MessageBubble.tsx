import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useThemeColors } from '../../hooks/useThemeColors';
import { SvgIcon } from '../index';

interface ChatMessage {
  id: string;
  parentMessageId: string;
  role: 'HUMAN' | 'AI';
  message: string;
}

interface Props {
  message: ChatMessage;
  onCopy?: (messageId: string) => void;
  onRetry?: (messageId: string) => void;
  onMenu?: (messageId: string) => void;
}

const MessageBubble: React.FC<Props> = ({ message, onCopy, onRetry, onMenu }) => {
  const themeColors = useThemeColors();
  const isUser = message.role === 'HUMAN';

  return (
    <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', margin: '6px 0' }}>
      <Box>
        <Box
          sx={{
            bgcolor: isUser
              ? {
                  xs: themeColors.pantone.main,
                  md: themeColors.white.dark,
                }
              : themeColors.background.primary,
            p: isUser ? "14px 20px" : 0,
            borderBottomLeftRadius: isUser ? "20px" : 0,
            borderTopRightRadius: isUser ? "20px" : 0,
            borderTopLeftRadius: isUser ? "20px" : 0,
            maxWidth: isUser ? "320px" : "90%",
            boxShadow: isUser ? "0px 1px 3px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: {
                xs: isUser
                  ? themeColors.white.main
                  : themeColors.text.primary,
                md: themeColors.text.primary,
              },
              whiteSpace: "pre-wrap",
            }}
          >
            {message.message}
          </Typography>
        </Box>
        
        {/* Action buttons for AI messages */}
        {!isUser && (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <IconButton size="small" onClick={() => onCopy?.(message.id)}>
              <SvgIcon name="chat_copy" width={20} height={20} />
            </IconButton>
            <IconButton size="small" onClick={() => onRetry?.(message.id)}>
              <SvgIcon name="chat_retry" width={20} height={20} />
            </IconButton>
            <IconButton size="small" onClick={() => onMenu?.(message.id)}>
              <SvgIcon name="chat_dot" width={20} height={20} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessageBubble;
