import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useThemeColors } from "@/hooks";
import Image from "next/image";
import ConnectingDots from "@/components/ConnectingDots";
import { Button, SvgIcon } from "@/components";

interface ConnectionProps {
  onAccept?: () => void;
  onDecline?: () => void;
  status?: "accepted" | "pending";
}

export const Connection: React.FC<ConnectionProps> = ({
  onAccept,
  onDecline,
  status = "accepted",
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, md: 0 },
      }}
    >
      {/* Profile Images Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: status === "pending" ? 3 : 7, md: 7 },
          mb: 4,
          position: "relative",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Connecting Dots */}
        <ConnectingDots
          left={isMobile && status === "pending" ? "50.5%" : "50%"}
          top={
             status === "pending"
              ? isMobile
                ? "30%"
                : "35%"
              : "40%"
          }
        />

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
              ml: { xs: status === "pending" ? 2 : 0, md: 0 },
            }}
          >
            <Image
              src="/charactor.png"
              alt="Aelia Kos"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant={isMobile ? "subtitleBold" : "bodyBold"}
              sx={{
                color: themeColors.grey.main,
                textAlign: "center",
              }}
            >
              Aelia Kos
            </Typography>{" "}
            {status === "pending" && (
              <Button
                small={isMobile ? true : false}
                sx={{ mt: 2 }}
                onClick={onDecline}
                variant="outlined"
              >
                View Profile
              </Button>
            )}
          </div>
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
              ml: { xs: status === "pending" ? 2 : 0, md: 0 },
            }}
          >
            <Image
              src="/dr_maya.png"
              alt="Dr. Maya K."
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant={isMobile ? "subtitleBold" : "bodyBold"}
              sx={{
                color: themeColors.grey.main,
                textAlign: "center",
              }}
            >
              Dr. Maya K.
            </Typography>

            {status === "pending" && (
              <Button
                small={isMobile ? true : false}
                sx={{ mt: 2 }}
                onClick={onDecline}
                variant="outlined"
              >
                View Profile
              </Button>
            )}
          </div>
        </Box>
      </Box>

      {/* Connection Info Box */}
      <Box
        sx={{
          bgcolor: themeColors.white.dark,
          borderRadius: "20px",
          padding: "20px",
          mb: 3,
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
              How you introduced them
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
              David, Sabrina shares your interest in the intersection of AI and
              meaningful social impact. Her focus on healthcare innovation
              aligns closely with your goal of connecting with leaders driving
              purposeful change. With her background in startups and mentorship,
              she offers not only industry expertise but also a collaborative
              mindset — making her an ideal connection for building both
              knowledge and opportunity.
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
          Dr. Maya shares your interest in the intersection of AI and meaningful
          social impact. Her focus on healthcare innovation aligns closely with
          your goal of connecting with leaders driving purposeful change. With
          her background in startups and mentorship, she offers not only
          industry expertise but also a collaborative mindset — making her an
          ideal connection for building both knowledge and opportunity.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          width: "100%",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {status === "accepted" ? (
          <>
            <Button
              small={isMobile ? true : false}
              onClick={onDecline}
              fullWidth
              variant="outlined"
            >
              View your conversation
            </Button>
            <Button
              small={isMobile ? true : false}
              onClick={onAccept}
              fullWidth
              variant="contained"
            >
              Add to this Constellation
            </Button>
          </>
        ) : (
          <>
            <>
              <Button
                small={isMobile ? true : false}
                onClick={onDecline}
                fullWidth={isMobile ? true : false}
                variant="outlined"
              >
                Send a reminder
              </Button>
              <Button
                small={isMobile ? true : false}
                onClick={onDecline}
                fullWidth={isMobile ? true : false}
                variant="outlined"
              >
                Edit Connection
              </Button>
              <Button
                small={isMobile ? true : false}
                onClick={onAccept}
                fullWidth={isMobile ? true : false}
                variant="contained"
              >
                Cancel Connection
              </Button>
            </>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Connection;
