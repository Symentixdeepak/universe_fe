import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { Button, ArrowBack, Checkbox } from "@/components";
import { useThemeColors } from "@/hooks";
import { useInterestStepperContext } from "./context/InterestStepperContext";

interface Step11Props {
  onNext: () => void;
  onBack: () => void;
}

const Step11: React.FC<Step11Props> = ({ onNext, onBack }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data,
    updateAnswer,
    getCompletionPercentage,
  } = useInterestStepperContext();

  const stepNumber = 11;

  // Define the options for Step 11
  const options = [
    { key: "artCreativity", label: "Art & Creativity" },
    { key: "sportsMovement", label: "Sports & Movement" },
    { key: "travelCultures", label: "Travel & Cultures" },
    { key: "foodCulinary", label: "Food & Culinary Experiences" },
    { key: "natureOutdoors", label: "Nature & Outdoors" },
    { key: "legacyImpact", label: "Legacy & Impact" },
    { key: "musicPerformance", label: "Music & Performance" },
    { key: "spiritualityPractices", label: "Spirituality & Inner Practices" },
    { key: "technologyInnovation", label: "Technology & Innovation" },
    { key: "businessEntrepreneurship", label: "Business & Entrepreneurship" },
    { key: "learningIdeas", label: "Learning & Ideas" },
  ];

  // Initialize state with existing data or default values
  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
    const existingData = data.answers[stepNumber];
    if (Array.isArray(existingData)) {
      return existingData as string[];
    }
    return [];
  });

  // Update context whenever selectedOptions changes
  useEffect(() => {
    if (selectedOptions.length > 0) {
      updateAnswer(stepNumber, selectedOptions);
    }
  }, [selectedOptions, stepNumber, updateAnswer]);

  const handleOptionToggle = (optionKey: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionKey)) {
        // Remove if already selected
        return prev.filter((key) => key !== optionKey);
      } else {
        // Add if not selected and under limit of 4
        if (prev.length < 4) {
          return [...prev, optionKey];
        } else {
          // If already at limit, don't add more
          return prev;
        }
      }
    });
  };

  const handleContinue = () => {
    updateAnswer(stepNumber, selectedOptions);
    onNext();
  };

  const completionPercentage = getCompletionPercentage();
  const canSelectMore = selectedOptions.length < 4;

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
            Which of these areas do you enjoy exploring in your life? (choose up
            to 4)
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // centers the group horizontally
              justifyContent: "center",
              textAlign: "center",
              mx: "auto",
              mb: 1,
              mt: 5,
            }}
          >
            <Box
              sx={{
                textAlign: "left", // aligns checkbox labels to the left
              }}
            >
              {options.map((option) => (
                <Box key={option.key} sx={{ mb: 2.5 }}>
                  <Checkbox
                    label={option.label}
                    checked={selectedOptions.includes(option.key)}
                    onChange={() => handleOptionToggle(option.key)}
                    disabled={
                      !selectedOptions.includes(option.key) && !canSelectMore
                    }
                  />
                </Box>
              ))}
            </Box>
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
            disabled={selectedOptions.length === 0}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Step11;
