import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { Button, ArrowBack } from "@/components";
import CustomSlider from "@/components/Slider";
import { useThemeColors } from "@/hooks";
import { useInterestStepperContext } from "./context/InterestStepperContext";

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
}

const Step6: React.FC<Step6Props> = ({ onNext, onBack }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data,
    updateAnswer,
    getCompletionPercentage,
  } = useInterestStepperContext();

  const stepNumber = 6;

  // Define the categories for Step 6
  const categories = [
    { key: "growth", label: "Growth & Learning" },
    { key: "contribution", label: "Contribution & Service" },
    { key: "creativity", label: "Creativity & Self-expression" },
    { key: "connection", label: "Connection & Belonging" },
    { key: "legacy", label: "Legacy & Impact" },
  ];

  // Initialize state with existing data or default values
  const [categoryValues, setCategoryValues] = useState<Record<string, number>>(
    () => {
      const existingData = data.answers[stepNumber];
      if (existingData && typeof existingData === "object") {
        return existingData as Record<string, number>;
      }
      // Default values for all categories
      const defaultValues: Record<string, number> = {};
      categories.forEach((cat) => {
        defaultValues[cat.key] = 0; // Default to 0 (unselected)
      });
      return defaultValues;
    }
  );

  // Count how many sliders are moved from default (0)
  const selectedCount = Object.values(categoryValues).filter(value => value > 0).length;
  const isSelectionLimitReached = selectedCount >= 3;

  // Update context whenever categoryValues changes
  useEffect(() => {
    if (Object.keys(categoryValues).length > 0) {
      updateAnswer(stepNumber, categoryValues);
    }
  }, [categoryValues, stepNumber, updateAnswer]);

  const handleSliderChange = (categoryKey: string) => (value: number) => {
    setCategoryValues(prev => ({
      ...prev,
      [categoryKey]: value,
    }));
  };

  const handleContinue = () => {
    updateAnswer(stepNumber, categoryValues);
    onNext();
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
            Which core drivers guide you most in life? (choose up to 3)
          </Typography>

          {/* Categories with Sliders */}
          <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 5 }}>
            {categories.map((category, index) => (
              <Box key={category.key} sx={{ mb: 4 }}>
                {/* Category Label */}
                <Typography
                  variant="bodyRegular"
                  sx={{
                    color: themeColors.text.primary,
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  {category.label}
                </Typography>

                {/* Slider */}
                <Box sx={{ width: "100%", maxWidth: 351, mt: 1, mx: "auto" }}>
                  <CustomSlider
                    steps={5}
                    value={categoryValues[category.key] || 0}
                    onChange={handleSliderChange(category.key)}
                    labelLeft="Not very Important"
                    labelRight="Very Important"
                    disabled={isSelectionLimitReached && (categoryValues[category.key] || 0) === 0}
                  />
                </Box>
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
            mt: -3,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Button fullWidth variant="contained" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Step6;
