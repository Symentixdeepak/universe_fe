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
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

interface Step3FormData {
  fullName: string;
  dateOfBirth: Dayjs | null;
  location: string;
  occupation: string;
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
    .required("Date of birth is required")
    .test("age", "You must be at least 18 years old", function(value) {
      if (!value) return false;
      const age = dayjs().diff(dayjs(value), 'year');
      return age >= 18;
    }),
  location: yup
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .required("Location is required"),
  occupation: yup
    .string()
    .trim()
    .min(0, "Occupation is optional"),
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

  const onSubmit = (data: Step3FormData) => {
    const formattedData = {
      fullName: data.fullName.trim(),
      dateOfBirth: data.dateOfBirth ? data.dateOfBirth.format('YYYY-MM-DD') : '',
      location: data.location.trim(),
      occupation: data.occupation.trim(),
    };

    updateStep3(formattedData);
    onNext(); // This will trigger the signup API call
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          px: 2,
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
            lineHeight:1.2
          }}
        >
          Nice to meet you! <br /> Stay a while.
        </Typography>

        {/* Sign Up Box */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                maxDate={dayjs().subtract(18, 'year')}
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
            type="submit"
            disabled={!isValid || isLoading}
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
