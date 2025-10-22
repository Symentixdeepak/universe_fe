import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Link } from "@/components";
import { useThemeColors } from "@/hooks";
import { colorProfiles } from "@/styles/theme";
import { useSignUpContext } from "../context/SignUpContext";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

interface SignUpStep2Props {
  onNext: () => void;
  onBack: () => void;
}

interface Step2FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain uppercase, lowercase, number and special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUpStep2: React.FC<SignUpStep2Props> = ({ onNext, onBack }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateStep2 } = useSignUpContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step2FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      email: formData.step2.email || formData.step1.email || "",
      password: formData.step2.password || "",
      confirmPassword: formData.step2.confirmPassword || "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const onSubmit = (data: Step2FormData) => {
    updateStep2({
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
      signupMethod: "email",
    });
    onNext();
  };

  const handleContinueWithLinkedIn = () => {
    updateStep2({ signupMethod: "linkedin" });
    onNext();
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
          Join the <br />
          Universe Club.
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: themeColors.text.primary,
            mb: 4,
            maxWidth: 400,
          }}
        >
          Let's get you signed up.{" "}
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
          {/* Email Input */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Password Input */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: themeColors.text.secondary,
                          '&:hover': {
                            color: themeColors.text.primary,
                          }
                        }}
                      >
                        {showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Confirm Password Input */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Re-enter your password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: themeColors.text.secondary,
                          '&:hover': {
                            color: themeColors.text.primary,
                          }
                        }}
                      >
                        {showConfirmPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Sign Up Button */}
          <Button
            sx={{ typography: "bodyBold" }}
            fullWidth
            variant="contained"
            type="submit"
            disabled={!isValid}
          >
            Sign up
          </Button>

          {/* OR Divider */}
          <Typography
            variant="captionLight"
            sx={{
              color: themeColors.text.primary,
              textAlign: "center",
              mt: -0.5,
              mb: -0.5,
            }}
          >
            OR
          </Typography>

          {/* Continue with LinkedIn Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleContinueWithLinkedIn}
            sx={{
              backgroundColor: "#0E76A8",
              color: "#E0E0E0",
              borderColor: "#0E76A8",
              "&:hover": {
                backgroundColor: themeColors.pantone.main,
                borderColor: themeColors.pantone.main,
                color: themeColors.background.primary,
              },
            }}
          >
            Sign up with LinkedIn
          </Button>

          {/* LinkedIn Disclaimer */}
          <Typography
            variant="captionLight"
            sx={{
              color: themeColors.text.primary,
              textAlign: "center",
            }}
          >
            {`(Signing up with LinkedIn allows us to create more precise matches for you based on your ongoing activity.)`}
          </Typography>

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

export default SignUpStep2;
