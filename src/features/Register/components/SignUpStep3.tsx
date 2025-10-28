import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Link, DatePicker } from "@/components";
import { useThemeColors } from "@/hooks";
import { colorProfiles } from "@/styles/theme";
import { useSignUpContext } from "../context/SignUpContext";
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface SignUpStep3Props {
  onNext: (step3Data?: any) => void;
  onBack: () => void;
  isLoading?: boolean;
}

interface Step3FormData {
  fullName: string;
  dateOfBirth?: any;
  location: string;
  occupation?: string;
}

const validationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  dateOfBirth: yup
    .mixed()
    .nullable()
    .optional(),
  location: yup
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .required("Location is required"),
  occupation: yup
    .string()
    .trim()
    .optional(),
});

const SignUpStep3: React.FC<SignUpStep3Props> = ({ onNext, onBack, isLoading = false }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateStep3 } = useSignUpContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    getValues,
  } = useForm<Step3FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      fullName: formData.step3.fullName || "",
      dateOfBirth: formData.step3.dateOfBirth ? dayjs(formData.step3.dateOfBirth, 'YYYY-MM-DD') : null,
      location: formData.step3.location || "",
      occupation: formData.step3.occupation || "",
    },
  });

  // Watch required fields to enable/disable button
  const watchedValues = watch();
  const isFormValid = Boolean(watchedValues.fullName?.trim() && watchedValues.location?.trim());

  const handleNextClick = async () => {
    console.log('Next button clicked'); // Debug log

    // Trigger validation first
    const isValid = await trigger();
    console.log('Validation result:', isValid); // Debug log

    if (!isValid) {
      console.log('Form validation failed'); // Debug log
      return;
    }

    // Get current form values directly
    const currentValues = getValues();
    console.log('Current form values:', currentValues); // Debug log

    const formattedData = {
      fullName: currentValues.fullName?.trim() || '',
      dateOfBirth: currentValues.dateOfBirth ? currentValues.dateOfBirth.format('YYYY-MM-DD') : '',
      location: currentValues.location?.trim() || '',
      occupation: currentValues.occupation?.trim() || '',
    };

    console.log('Formatted data for API:', formattedData); // Debug log

    // Update context with form data (for UI state consistency)
    updateStep3(formattedData);

    // Pass the formatted data directly to onNext to avoid timing issues
    onNext(formattedData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "calc(100vh - 56px)", md: "100vh" },
          textAlign: "center",
          px: 2,
          mt: { xs: "56px", md: 0 }
        }}
      >
        {/* Main Title */}
        <Typography
          variant={isMobile ? "h3Bold" : "h2Bold"}
          sx={{
            color: themeColors.text.primary,
            mb: 1,
            lineHeight: 1.2,
          }}
        >
          Your Universe <br />
          Club profile.
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: themeColors.text.primary,
            mb: 4,
            maxWidth: 400,
            lineHeight: 1.2
          }}
        >
          Nice to meet you! <br /> Stay a while.
        </Typography>

        {/* Sign Up Box */}
        <Box
          component="form"
          sx={{
            width: 309,
            border: `1px solid ${themeColors.border.primary}`,
            borderRadius: "20px",
            pt: "30px",
            px: "20px",
            pb: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Full Name Input */}
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Full Name"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />

          {/* Date of Birth Input */}
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                fullWidth
                placeholder="Date of birth (DD/MM/YYYY)"
                variant="outlined"
              />
            )}
          />

          {/* Location Input */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Where are you located?"
                variant="outlined"
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />

          {/* Occupation Input (Optional) */}
          <Controller
            name="occupation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="What do you do? (Optional)"
                variant="outlined"
                error={!!errors.occupation}
                helperText={errors.occupation?.message}
              />
            )}
          />

          {/* Complete Registration Button */}
          <Button
            sx={{ typography: "bodyBold" }}
            fullWidth
            variant="contained"
            onClick={handleNextClick}
            disabled={!isFormValid || isLoading}
            loading={isLoading}
            loadingText="Creating Account..."
          >
            Next
          </Button>

          {/* Privacy Policy */}
          <Typography
            variant="captionLight"
            sx={{
              color: themeColors.text.primary,
              textAlign: "center",
            }}
          >
            By continuing, you agree to our{" "}
            <Link
              href="/privacy-policy"
              variant="captionLight"
              theme="auto"
              underline
            >
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpStep3;
