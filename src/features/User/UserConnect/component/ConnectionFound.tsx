import React from "react";
import { Box, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks";
import Image from "next/image";
import ConnectingDots from "@/components/ConnectingDots";
import { Button } from "@/components";

interface ConnectionFoundProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export const ConnectionFound: React.FC<ConnectionFoundProps> = ({
  onAccept,
  onDecline,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        maxWidth: "604px",
        margin: "0 auto",
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4,
      
      }}
    >
      {/* Title */}
      <Typography
        variant="h2Bold"
        sx={{
          color: themeColors.pantone.main,
          mb: 5,
          textAlign: "center",
        }}
      >
        Connection Found!
      </Typography>

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
              width: 190,
              height: 190,
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
            variant="bodyBold"
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
              width: 190,
              height: 190,
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
            variant="bodyBold"
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
        <Box sx={{ display: "flex", gap: 2.5 }}>
          <Image
            src="/assets/images/icons/notice_i.svg"
            height={20}
            width={20}
            style={{ marginTop: 4 }}
            alt="info icon"
          />

          <Box>
            <Typography
              variant="bodyBold"
              sx={{
                color: themeColors.text.primary,
              }}
            >
              Why we think this is a good connection
            </Typography>

            <Typography
              variant="bodyLight"
              sx={{
                color: themeColors.text.primary,
                mt: 1,
                lineHeight: "150%",
                display: "block",
              }}
            >
              Dr. Maya shares your interest in the intersection of AI and
              meaningful social impact. Her focus on healthcare innovation
              aligns closely with your goal of connecting with leaders driving
              purposeful change. With her background in startups and mentorship,
              she offers not only industry expertise but also a collaborative
              mindset — making her an ideal connection for building both
              knowledge and opportunity.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
        }}
      >
        <Button onClick={onAccept} fullWidth variant="outlined">
          Accept
        </Button>
        <Button onClick={onDecline} fullWidth variant="contained">
          Decline
        </Button>
      </Box>
    </Box>
  );
};

export default ConnectionFound;
