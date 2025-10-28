import React, { useState, useEffect } from 'react';
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
import { getImportanceLabel } from '@/utils/sliderLabel';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

interface CategoryData {
  id: string;
  name: string;
  value: number;
}

const categories: CategoryData[] = [
  { id: 'business', name: 'Business & Career', value: 1 },
  { id: 'personal', name: 'Personal Development', value: 1 },
  { id: 'family', name: 'Family & Relationships', value: 1 },
  { id: 'spirituality', name: 'Spirituality & Inner Growth', value: 1 },
  { id: 'health', name: 'Health & Wellbeing', value: 1 },
  { id: 'adventure', name: 'Adventure & Lifestyle', value: 1 },
];

const Step3: React.FC<Step3Props> = ({ onNext, onBack }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, updateAnswer, getCompletionPercentage } = useInterestStepperContext();

  // Initialize category values from saved data or defaults
  const [categoryValues, setCategoryValues] = useState<Record<string, number>>(() => {
    const saved = data.answers[3];
    if (saved && typeof saved === 'object') {
      return saved as Record<string, number>;
    }
    // Initialize with default values
    const initial: Record<string, number> = {};
    categories.forEach(cat => {
      initial[cat.id] = 0; // Default to 0 (unselected)
    });
    return initial;
  });

  // Count how many sliders are moved from default (0)
  const selectedCount = Object.values(categoryValues).filter(value => value > 1).length;
  const isSelectionLimitReached = selectedCount >= 3;

  const handleSliderChange = (categoryId: string) => (value: number) => {
    setCategoryValues(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  // Save to context whenever values change
  useEffect(() => {
    if (Object.keys(categoryValues).length > 0) {
      updateAnswer(3, categoryValues);
    }
  }, [categoryValues, updateAnswer]);

  const handleContinue = () => {
    updateAnswer(3, categoryValues);
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
          position: "relative",
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
              mb: 6,
              lineHeight: 1.2,
            }}
          >
            Which areas are central to your life? (choose up to 3)
          </Typography>

          {/* Categories with Sliders */}
          <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 5 }}>
            {categories.map((category, index) => (
              <Box key={category.id} sx={{ mb: 4 }}>
                {/* Category Name */}
                <Typography
                  variant="bodyRegular"
                  sx={{
                    color: themeColors.text.primary,
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  {category.name}
                </Typography>

                {/* Slider */}
                <Box sx={{ width: "100%", maxWidth: 351, mt: 1, mx: "auto" }}>
                  <CustomSlider
                    steps={5}
                    value={categoryValues[category.id] || 1}
                    onChange={handleSliderChange(category.id)}
                    labelLeft={categoryValues[category.id] === 4 || categoryValues[category.id] === 5 ? "Not very important" : getImportanceLabel(categoryValues[category.id])}
                    labelRight={categoryValues[category.id] === 4 || categoryValues[category.id] === 5 ? getImportanceLabel(categoryValues[category.id]) : "Very important"}
                    disabled={isSelectionLimitReached && (categoryValues[category.id] || 1) <= 1}
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
            mt: -3,
            maxWidth: 263,
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

export default Step3;