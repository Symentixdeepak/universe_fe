import React from "react";
import { Dialog, Box, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  titleHighlight?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  titleHighlight,
  children,
}) => {
  const { pantone } = useThemeColors();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.65)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "30px",
          width: "auto",
          height: "auto",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "visible",
        },
      }}
    >
      {(title || titleHighlight) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Typography variant="h3Bold" sx={{ textAlign: "center" }}>
            {title}
            {titleHighlight && (
              <Box
                component="span"
                sx={{
                  color: pantone.main,
                  marginLeft: title ? "8px" : 0,
                }}
              >
                {titleHighlight}
              </Box>
            )}
          </Typography>
        </Box>
      )}
      <Box>{children}</Box>
    </Dialog>
  );
};

export default Modal;
