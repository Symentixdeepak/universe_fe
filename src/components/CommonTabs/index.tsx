import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useThemeColors } from "@/hooks";

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
      id={`common-tabpanel-${index}`}
      aria-labelledby={`common-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface CommonTabsProps {
  tabs: TabItem[];
  defaultActiveTab?: number;
}

const CommonTabs: React.FC<CommonTabsProps> = ({
  tabs,
  defaultActiveTab = 0,
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleMobileTabClick = (index: number) => {
    setActiveTab(activeTab === index ? -1 : index);
  };

  if (isMobile) {
    // Mobile: Collapsible accordions
    return (
      <Box sx={{ mt: 6 }}>
        {tabs.map((tab, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            {/* Collapsible Tab Header */}
            <Box
              onClick={() => handleMobileTabClick(index)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <Typography
                variant={
                  activeTab === index ? "subtitleBold" : "subtitleRegular"
                }
                sx={{
                  display: "flex",
                  color:
                    activeTab === index
                      ? themeColors.pantone.main
                      : themeColors.grey.main,
                  transition: "color 0.3s ease",
                  borderBottom:
                    activeTab === index
                      ? `2px solid ${
                          activeTab === index
                            ? themeColors.pantone.main
                            : themeColors.border.secondary
                        }`
                      : "none",
                }}
              >
                {tab.label}
                <Typography component={"span"}>
                  <Box
                    sx={{
                      color:
                        activeTab === index
                          ? themeColors.pantone.main
                          : themeColors.text.secondary,
                      transition: "all 0.3s ease",
                      transform:
                        activeTab === index ? "rotate(0deg)" : "rotate(0deg)",
                    }}
                  >
                    {activeTab === index ? (
                      <KeyboardArrowDownIcon
                        sx={{ fontSize: 16, color: themeColors.pantone.main }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
                    )}
                  </Box>
                </Typography>
              </Typography>
            </Box>

            {/* Collapsible Content */}
            <Collapse
              in={activeTab === index}
              timeout={300}
              sx={{
                "& .MuiCollapse-wrapper": {
                  transition: "all 0.3s ease",
                },
              }}
            >
              <Box sx={{ py: 2 }}>{tab.content}</Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    );
  }

  // Desktop: Traditional tabs
  return (
    <Box sx={{ mt: 6 }}>
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
              fontWeight: 800,
            },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: themeColors.pantone.main,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default CommonTabs;
