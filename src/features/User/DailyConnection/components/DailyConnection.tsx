import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useThemeColors } from "@/hooks";
import Image from "next/image";
import ConnectingDots from "@/components/ConnectingDots";
import { Button, SvgIcon } from "@/components";
import { useRouter } from "next/router";

interface DailyConnectionProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export const DailyConnection: React.FC<DailyConnectionProps> = ({
  onAccept,
  onDecline,
}) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const connection = router.query.connection || "1";
  const showCounter = connection?.length > 1 || router.query.total
  return (
    <Box
      sx={{
        maxWidth: "604px",
        margin: "0 auto",
        minHeight: { xs: "calc(100vh - 56px)", md: "calc(100vh - 62px)" },

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: 4,
        mt: 3,
        padding: { xs: 3, md: 0 },
      }}
    >
      {/* Title */}
      <Typography
        variant={isMobile ? "h4Bold" : "h2Bold"}
        sx={{
          color: themeColors.pantone.main,
          mb: showCounter ? 0.2 : 5,
          textAlign: "center",
        }}
      >
        Daily Connections
      </Typography>
      {showCounter && (
        <Typography
          variant="bodyRegular"
          sx={{ color: themeColors.grey.main, mb: 5 }}
        >
          (Viewing connection {router.query.count} of {router.query?.total})
        </Typography>
      )}

      {/* Profile Images Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          mb: 4,
          position: "relative",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Connecting Dots */}
        <ConnectingDots />

        {/* First Profile Lig*/}
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: isMobile ? 120 : 190,
              height: isMobile ? 120 : 190,
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              mb: 2,
            }}
          >
            <Image
              src="/charactor.png"
              alt="Aelia Kos"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Typography
            variant={isMobile ? "subtitleBold" : "bodyBold"}
            sx={{
              color: themeColors.grey.main,
              textAlign: "center",
            }}
          >
            Aelia Kos
          </Typography>
        </Box>

        {/* Second Profile */}
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: isMobile ? 120 : 190,
              height: isMobile ? 120 : 190,
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              mb: 2,
            }}
          >
            <Image
              src="/dr_maya.png"
              alt="Dr. Maya K."
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Typography
            variant={isMobile ? "subtitleBold" : "bodyBold"}
            sx={{
              color: themeColors.grey.main,
              textAlign: "center",
            }}
          >
            Dr. Maya K.
          </Typography>
        </Box>
      </Box>

      {/* Connection Info Box */}
      <Box
        sx={{
          bgcolor: themeColors.white.dark,
          borderRadius: "20px",
          padding: "20px",
          mb: 5,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2.5 } }}>
          <SvgIcon
            name="notice_i"
            width={20}
            height={20}
            style={{ marginTop: 4 }}
          />

          <Box>
            <Typography
              variant={isMobile ? "subtitleBold" : "bodyBold"}
              sx={{
                color: themeColors.text.primary,
              }}
            >
              Why we think this is a good connection{" "}
            </Typography>
            <Typography
              variant={isMobile ? "subtitleLight" : "bodyLight"}
              sx={{
                color: themeColors.text.primary,
                mt: 1,
                lineHeight: "150%",
                display: { xs: "none", md: "block" },
              }}
            >
              Your shared focus on leadership, growth, and resilience makes
              Simba a strong match. His journey reflects courage,
              accountability, and the ability to inspire others — qualities that
              align closely with your own approach to building meaningful
              connections and leading with purpose.
            </Typography>
          </Box>
        </Box>
        <Typography
          variant={isMobile ? "subtitleLight" : "bodyLight"}
          sx={{
            color: themeColors.text.primary,
            mt: 1,
            lineHeight: "150%",
            display: { xs: "block", md: "none" },
          }}
        >
          Your shared focus on leadership, growth, and resilience makes Simba a
          strong match. His journey reflects courage, accountability, and the
          ability to inspire others — qualities that align closely with your own
          approach to building meaningful connections and leading with purpose.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
        }}
      >
        <Button onClick={onAccept} fullWidth variant="contained">
          Request Connection
        </Button>
        <Button onClick={onDecline} fullWidth variant="outlined">
          Skip Connection
        </Button>
      </Box>
    </Box>
  );
};

export default DailyConnection;
