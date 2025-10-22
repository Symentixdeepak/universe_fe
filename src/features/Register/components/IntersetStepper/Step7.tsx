import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { Button, ArrowBack, Radio } from "@/components";
import { useThemeColors } from "@/hooks";
import { useInterestStepperContext } from "./context/InterestStepperContext";

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
}

const Step7: React.FC<Step7Props> = ({ onNext, onBack }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, updateAnswer, getCompletionPercentage } = useInterestStepperContext();

  const stepNumber = 7;
  
  // Define the options for Step 7
  const options = [
    { key: "visionary", label: "Visionary" },
    { key: "operator", label: "Operator" },
    { key: "connector", label: "Connector" },
    { key: "supporter", label: "Supporter" },
  ];

  // Initialize state with existing data or default value
  const [selectedOption, setSelectedOption] = useState<string>(() => {
    const existingData = data.answers[stepNumber];
    return typeof existingData === 'string' ? existingData : '';
  });

  // Update context whenever selectedOption changes
  useEffect(() => {
    if (selectedOption) {
      updateAnswer(stepNumber, selectedOption);
    }
  }, [selectedOption, stepNumber, updateAnswer]);

  const handleOptionSelect = (optionKey: string) => {
    setSelectedOption(optionKey);
  };

  const handleContinue = () => {
    if (selectedOption) {
      updateAnswer(stepNumber, selectedOption);
      onNext();
    }
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          px: 2,
          py: 4,
        }}
      >
        {/* Progress Section */}
        <Box sx={{ width: "100%", maxWidth: 847, mb: 4 }}>
          {/* Back Button */}
          <Box mb={2}>
            <ArrowBack onClick={onBack} iconSize={32} buttonSize="large" />
          </Box>

          {/* Getting to know you text */}
          <Typography
            variant="bodyRegular"
            sx={{
              color: themeColors.text.primary,
              mb: 3,
            }}
          >
            Getting to know you.
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ width: "100%", mb: 1, mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{
                height: 13,
                borderRadius: 4,
                backgroundColor: themeColors.background.secondary,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: themeColors.pantone.light,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </Box>

        {/* Question Section */}
        <Box sx={{ width: "100%", maxWidth: 945, mb: 6, mt: -3 }}>
          {/* Main Question */}
          <Typography
            variant={isMobile ? "h3Bold" : "h2Bold"}
            sx={{
              color: themeColors.text.primary,
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            When collaborating with others, how do you see yourself?
          </Typography>

          {/* Radio Options */}
          <Box sx={{ width: "100%", maxWidth: 341, mx: "auto",  mt: 5 }}>
            {options.map((option) => (
              <Box key={option.key} sx={{ mb: 2 }}>
                <Radio
                  label={option.label}
                  selected={selectedOption === option.key}
                  onSelect={() => handleOptionSelect(option.key)}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            maxWidth: 263,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleContinue}
            disabled={!selectedOption}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Step7;