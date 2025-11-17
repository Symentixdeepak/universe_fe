import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks";

interface ImportStep1Props {
  onFileSelect: (file: File) => void;
}

const ImportStep1: React.FC<ImportStep1Props> = ({ onFileSelect }) => {
  const themeColors = useThemeColors();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (
      !validTypes.includes(file.type) &&
      !["csv", "xlsx", "xls"].includes(fileExtension || "")
    ) {
      alert("Please select a valid CSV or XLSX file");
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (
      !validTypes.includes(file.type) &&
      !["csv", "xlsx", "xls"].includes(fileExtension || "")
    ) {
      alert("Please select a valid CSV or XLSX file");
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          width: "100%",
          maxWidth: "500px",
          height: "300px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: themeColors.pantone.main,
            backgroundColor: themeColors.white.dark,
          },
        }}
      >
        <Box
          sx={{
            marginBottom: "15px",
            "& svg path": {
              transition: "fill 0.3s ease",
            },
            "&:hover svg path, &:active svg path": {
              fill: themeColors.pantone.main,
            },
          }}
        >
          <svg
            width="168"
            height="168"
            viewBox="0 0 168 168"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M84 159.25C42.49 159.25 8.75 125.51 8.75 84C8.75 42.49 42.49 8.75 84 8.75C125.51 8.75 159.25 42.49 159.25 84C159.25 125.51 125.51 159.25 84 159.25ZM84 19.25C48.3 19.25 19.25 48.3 19.25 84C19.25 119.7 48.3 148.75 84 148.75C119.7 148.75 148.75 119.7 148.75 84C148.75 48.3 119.7 19.25 84 19.25Z"
              fill="#989898"
            />
            <path
              d="M112 89.25H56C53.13 89.25 50.75 86.87 50.75 84C50.75 81.13 53.13 78.75 56 78.75H112C114.87 78.75 117.25 81.13 117.25 84C117.25 86.87 114.87 89.25 112 89.25Z"
              fill="#989898"
            />
            <path
              d="M84 117.25C81.13 117.25 78.75 114.87 78.75 112V56C78.75 53.13 81.13 50.75 84 50.75C86.87 50.75 89.25 53.13 89.25 56V112C89.25 114.87 86.87 117.25 84 117.25Z"
              fill="#989898"
            />
          </svg>
        </Box>
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.grey.light,
            textAlign: "center",
          }}
        >
          Click or drag CSV from your computer to import into your Universe
        </Typography>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Box>
    </Box>
  );
};

export default ImportStep1;
