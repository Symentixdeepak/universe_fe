import React, { useState } from "react";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useThemeColors } from "@/hooks";
import Image from "next/image";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

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
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: themeColors.background.primary,
        minHeight: "400px",
        mt:6
      }}
    >
      {/* Why Connected Section */}
      <Box
        sx={{
          bgcolor: themeColors.white.dark,
          borderRadius: "20px",
          padding: "20px",
 
          width: "100%",
  
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

      {/* Tabs Section */}
      <Box sx={{ mt:6}}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: `1px solid ${themeColors.border.secondary}`,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 400,
              color: themeColors.grey.main,
              "&.Mui-selected": {
                color: themeColors.pantone.main,
                fontWeight:800
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: themeColors.pantone.main,
            },
          }}
        >
          <Tab label="About me" />
          <Tab label="What I am seeking" />
          <Tab label="Mutual Connections" />
          <Tab label="Professional Portfolio" />
        </Tabs>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Typography
            variant="bodyRegular"
            sx={{
              color: themeColors.text.primary,
              lineHeight: 1.6,
            }}
          >
            {aboutContent}
          </Typography>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
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
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
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
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
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
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ProfileAboutFooter;
