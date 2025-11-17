import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import ImportStep1 from "./components/ImportStep1";
import ImportStep2 from "./components/ImportStep2";
import ImportStep3 from "./components/ImportStep3";
import ImportStep4 from "./components/ImportStep4";
import ImportStep5 from "./components/ImportStep5";
import { useThemeColors } from "@/hooks";
import { ImportProvider, useImportContext } from "./context/ImportContext";

const ImportContactContent = () => {
  const themeColors = useThemeColors();
  const {
    currentStep,
    selectedFile,
    progress,
    handleFileSelect,
  } = useImportContext();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ImportStep1 onFileSelect={handleFileSelect} />;
      case 2:
        return (
          <ImportStep2 fileName={selectedFile?.name} progress={progress} />
        );
      case 3:
        return <ImportStep3 />;
      case 4:
        return <ImportStep4 />;
      case 5:
        return <ImportStep5 />;
      default:
        return <ImportStep1 onFileSelect={handleFileSelect} />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          //   left: { xs: 0, md: '185px' },
          top: 65,
          height: "calc(100vh - 65px)",
          width: "372px",
          zIndex: 100,
          backgroundColor: themeColors.white.main,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: 0, md: "372px" },
          backgroundColor: themeColors.white.dark,
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: "calc(100vh - 65px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
            padding: "20px",
          }}
        >
          {renderStep()}
        </Box>
      </Box>
    </Box>
  );
};

const ImportContact = () => {
  return (
    <ImportProvider>
      <ImportContactContent />
    </ImportProvider>
  );
};

export default ImportContact;
