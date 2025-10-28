import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Fade,
  Slide,
} from "@mui/material";
import { Button, ArrowBack } from "@/components";
import CustomSlider from "@/components/Slider";
import { useThemeColors } from "@/hooks";
import {
  useInterestStepperContext,
  INTEREST_QUESTIONS,
} from "../context/InterestStepperContext";
import Header from "@/features/Register/components/Header";
import { getImportanceLabel } from "@/utils/sliderLabel";

interface StepProps {
  stepNumber: number;
  onNext: () => void;
  onBack: () => void;
}

const Step: React.FC<StepProps> = ({ stepNumber, onNext, onBack }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data,
    updateAnswer,
    getCompletionPercentage,
    canProceedToNext,
    loading,
    getStepValidationMessage,
  } = useInterestStepperContext();

  const question = INTEREST_QUESTIONS[stepNumber - 1];

  // Safety check - if question doesn't exist, return null
  if (!question) {
    return null;
  }

  const [currentValue, setCurrentValue] = useState(
    data.answers[stepNumber] !== undefined
      ? (data.answers[stepNumber] as number)
      : question.value
  );
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount and step change
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [stepNumber]);



  const handleSliderChange = (value: number) => {
    setCurrentValue(value);
    updateAnswer(stepNumber, value);
  };

  const handleContinue = () => {
    // Always save the current value (which could be the default value)
    updateAnswer(stepNumber, currentValue);
    onNext();
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <Container maxWidth="md">

      <Fade in={isVisible} timeout={600}>
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
            transition: 'all 0.3s ease-out',
          }}
        >




          {/* Progress Section */}
          {stepNumber > 1 && (

            <Box sx={{ width: "100%", maxWidth: 847, mb: 4 }}>
              {/* Back Button */}
              {stepNumber > 1 && (
                <Box mb={2}>
                  <ArrowBack onClick={onBack} iconSize={32} buttonSize="large" />
                </Box>
              )}

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
              <Box sx={{ width: "100%", mb: 1, mt: { xs: 3.5, md: 2 } }}>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{
                    height: 13,
                    borderRadius: 4,
                    backgroundColor: themeColors.background.secondary,
                    transition: 'all 0.6s ease-out',
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: themeColors.pantone.light,
                      borderRadius: 4,
                      transition: 'transform 0.6s ease-out',
                    },
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Question Section */}
          <Box sx={{ width: { xs: "auto", md: 945 }, mb: 6, mt: { xs: 0, md: -3 } }}>
            {/* Main Question */}
            <Typography
              variant={isMobile ? "h3Bold" : "h2Bold"}
              sx={{
                color: themeColors.text.primary,
                mb: 4,
                lineHeight: 1.2,
              }}
            >
              {question.question}
            </Typography>

            {/* Slider */}
            <Box sx={{ width: "100%", maxWidth: 351, mx: "auto", mb: 1, mt: 5 }}>
              <CustomSlider
                steps={5}
                value={currentValue}
                onChange={handleSliderChange}
                labelLeft={currentValue === 4 || currentValue === 5 ? question.labelLeft : getImportanceLabel(currentValue,stepNumber)}
                labelRight={currentValue === 4 || currentValue === 5 ? getImportanceLabel(currentValue,stepNumber) : question.labelRight}
              />
            </Box>
          </Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              maxWidth: { xs: 133, md: 263 },
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Button loading={loading} fullWidth variant="contained" onClick={handleContinue} >
              {"Continue"}
            </Button>

          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default Step;
