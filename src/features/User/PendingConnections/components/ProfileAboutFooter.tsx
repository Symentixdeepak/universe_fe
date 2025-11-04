import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useThemeColors } from "@/hooks";
import { SvgIcon, CommonTabs } from "@/components";
import Image from "next/image";

interface ProfileAboutFooterProps {
  aboutContent?: string;
  seeking?: string;
  mutualConnections?: any[];
  portfolio?: any[];
}

const ProfileAboutFooter: React.FC<ProfileAboutFooterProps> = ({
  aboutContent = `I'm Dr. Maya K., an entrepreneur and researcher based in Toronto, specializing in the application of AI to healthcare. My journey began in biomedical research, where I first realized how technology could transform patient outcomes. Today, I lead a health-tech startup focused on using machine learning to support doctors and improve quality of care. I'm passionate about connecting with forward-thinking professionals who believe in the power of AI to create meaningful social impact. When I'm not working, you'll probably find me mentoring young innovators, exploring the outdoors, or reading about the future of medicine. I'm here to collaborate with people who want to push boundaries and make a lasting difference.`,
  seeking = "",
  mutualConnections = [],
  portfolio = [],
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Prepare tab data for CommonTabs
  const tabsData = [
    {
      label: "About me",
      content: (
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.text.primary,
            lineHeight: 1.6,
          }}
        >
          {aboutContent}
        </Typography>
      ),
    },
    {
      label: "What I am seeking",
      content: (
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.text.secondary,
            fontStyle: "italic",
          }}
        >
          {seeking ||
            "Information about what this person is seeking is not available."}
        </Typography>
      ),
    },
    {
      label: "Mutual Connections",
      content: (
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.text.secondary,
            fontStyle: "italic",
          }}
        >
          {mutualConnections.length > 0
            ? "Mutual connections will be displayed here."
            : "No mutual connections found."}
        </Typography>
      ),
    },
    {
      label: "Professional Portfolio",
      content: (
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.text.secondary,
            fontStyle: "italic",
          }}
        >
          {portfolio.length > 0
            ? "Professional portfolio will be displayed here."
            : "No portfolio items available."}
        </Typography>
      ),
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: themeColors.background.primary,
        minHeight: "400px",
        mt: 6,
      }}
    >
      {/* Why Connected Section */}
      <Box
        sx={{
          bgcolor: themeColors.white.dark,
          borderRadius: "20px",
          padding: "20px",
          mb: 5,
          width: "100%",
     
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
              Why we think this is a good connection
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

      {/* Tabs Section */}
      <CommonTabs tabs={tabsData} defaultActiveTab={0} />
    </Box>
  );
};

export default ProfileAboutFooter;
