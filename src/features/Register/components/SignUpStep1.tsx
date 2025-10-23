import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Button, TextField, Link } from "@/components";
import { useThemeColors } from "@/hooks";
import { colorProfiles } from "@/styles/theme";
import { useSignUpContext } from "../context/SignUpContext";
import { useAuth } from "@/contexts/AuthContext";
import { toastService } from "@/lib/toast";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

interface SignUpStep1Props {
  onNext: () => void;
  onBack: () => void;
}

const SignUpStep1: React.FC<SignUpStep1Props> = ({ onNext, onBack }) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateStep1 } = useSignUpContext();
  const { login, isLoading } = useAuth();
  // const linkedInLoginMutation = useLinkedInLoginUrl();

  const [email, setEmail] = useState(formData.step1.email);
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    updateStep1({ email: newEmail });
  };

  const handleContinueWithEmail = () => {
    if (email.trim()) {
      setShowLoginForm(true);
    } else {
      toastService.error("Please enter your email address");
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toastService.error("Please enter both email and password");
      return;
    }

    const result = await login(email.trim(), password.trim());

    if (result.success) {
      toastService.success("Login successful!");
      // Redirect to dashboard after successful login
      window.location.href = "/dashboard";
    } else {
      toastService.error(result.error || "Login failed");
    }
  };

  const handleContinueWithLinkedIn = () => {
    // LinkedIn OAuth integration would go here
    toastService.info("LinkedIn login not implemented yet");
  };

  const handleSignUp = () => {
    onNext();
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          px: 2,
          ml: { xs: 0, md: 25 },
          gap: { xs: 0, md: 12 },
        }}
      >
        {/* Left Side - Sign Up Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flex: { xs: 1, md: "0 0 auto" },
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
            Welcome to the <br />
            Universe.
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
            Meaningful connections for a richer life.
          </Typography>

          {/* Sign Up Box */}
          <Box
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
            <TextField
              fullWidth
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
            />

            {/* Password Input - Only shown in login mode */}
            {showLoginForm && (
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <Box
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        color: themeColors.text.secondary,
                        "&:hover": {
                          color: themeColors.text.primary,
                        },
                      }}
                    >
                      {showPassword ? (
                        <LockOpenOutlinedIcon />
                      ) : (
                        <LockOutlinedIcon />
                      )}
                    </Box>
                  ),
                }}
              />
            )}

            {/* Continue with Email / Login Button */}
            <Button
              fullWidth
              variant="outlined"
              theme="auto"
              onClick={showLoginForm ? handleLogin : handleContinueWithEmail}
              loading={showLoginForm && isLoading}
              disabled={showLoginForm && isLoading}
              sx={{
                borderRadius: "25px",
                py: 1.5,
              }}
            >
              {showLoginForm ? "Login" : "Continue with Email"}
            </Button>

            {/* OR Divider - Only shown when not in login mode */}
            {!showLoginForm && (
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
            )}

            {/* Continue with LinkedIn Button - Only shown when not in login mode */}
            {!showLoginForm && (
              <Button
                fullWidth
                variant="outlined"
                onClick={handleContinueWithLinkedIn}
                sx={{
                  borderRadius: "25px",
                  color: "#E0E0E0",
                  border: "1px solid #282828",
                  py: 1.5,
                  backgroundColor: "#0E76A8",
                  "&:hover": {
                    backgroundColor: colorProfiles.pantones.main,
                    border: `1px solid ${colorProfiles.pantones.main}`,
                  },
                }}
              >
                Continue with LinkedIn
              </Button>
            )}

            {/* Login/Signup Toggle */}
            <Typography
              variant="captionLight"
              sx={{
                color: themeColors.text.primary,
                textAlign: "center",
              }}
            >
              {showLoginForm ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    href="/auth/register?step=2"
                    variant="captionLight"
                    theme="auto"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="#"
                    variant="captionLight"
                    theme="auto"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLoginForm(true);
                    }}
                  >
                    Login
                  </Link>
                </>
              )}
            </Typography>

            {/* Sign Up Button - Only shown when not in login mode */}
            {!showLoginForm && (
              <Button
                sx={{ typography: "bodyBold" }}
                fullWidth
                variant="contained"
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            )}

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
        {/* Right Side - Circular Image (Hidden on small screens) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
          }}
        >
          <Box
            component="img"
            src="/charactor.jpg"
            alt="Character"
            sx={{
              width: 500,
              height: 500,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpStep1;
