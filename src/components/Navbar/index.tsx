import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useThemeColors } from "@/hooks";
import { ProfilePopover } from "@/components";
import { useSidebar } from "@/contexts/SideBarContext";

interface NavbarProps {
  isSidebarExpanded?: boolean;
  showIconOnlyNavbar?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isSidebarExpanded = true,
  showIconOnlyNavbar,
}) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const { toggleSidebar } = useSidebar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(
    null
  );
console.log({showIconOnlyNavbar});
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle profile popover
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const isProfileOpen = Boolean(profileAnchorEl);

  // Track scroll position to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Add shadow after scrolling 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "56px", md: "62px" }, // Mobile: 56px, Desktop: 62px
        padding: {
          xs: "11px 30px", // Mobile: (56-34)/2 = 11px vertical, 20px horizontal
          md: "15px 40px 15px 40px", // Desktop: original padding
        },
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: isMobile
          ? themeColors.white.dark
          : isScrolled
          ? themeColors.background.primary
          : `${themeColors.background.primary}F5`,
        boxShadow: isScrolled ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "none",
        transition: "all 0.3s ease-in-out",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Left side - Hamburger Menu (Mobile) or Logo */}
      {isMobile ? (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            padding: 0,
            width: 24,
            height: 24,
            color: themeColors.text.primary,
            "&:hover": {
              backgroundColor: "transparent",
              color: themeColors.pantone.light,
            },
            "&:active": {
              color: themeColors.pantone.dark,
            },
          }}
        >
          <MenuIcon sx={{ fontSize: 26 }} />
        </IconButton>
      ) : (
        <Box sx={{ ml: isSidebarExpanded ? 23 : 7 }}>
          {!showIconOnlyNavbar ? (
            <Image
              src="/assets/images/logos/universal_name_logo.png"
              alt="Universal Logo"
              width={148}
              height={40}
              style={{
                objectFit: "contain",
                filter: themeColors?.isDark ? "invert(1)" : "inherit",
              }}
            />
          ) : (
            <Image
              src="/assets/images/logos/universal_logo.png"
              alt="Universal Logo"
              width={40}
              height={40}
              style={{
                objectFit: "contain",
                filter: themeColors?.isDark ? "invert(1)" : "inherit",
              }}
            />
          )}
        </Box>
      )}
      {isMobile && (
        <Box sx={{ mt: 1 }}>
          <Image
            src="/assets/images/logos/universal_logo.png"
            alt="Universal Logo"
            width={25}
            height={25}
            style={{
              objectFit: "contain",
              filter: themeColors?.isDark ? "invert(1)" : "inherit",
            }}
          />
        </Box>
      )}

      {/* Right side - User Avatar */}
      <IconButton
        onClick={handleProfileClick}
        sx={{
          padding: 0,
          width: { xs: 34, md: 40 }, // Mobile: 34px, Desktop: 40px
          height: { xs: 34, md: 40 }, // Mobile: 34px, Desktop: 40px
          borderRadius: "50%",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <Image
          src="/charactor.png"
          alt="User Avatar"
          width={isMobile ? 34 : 40}
          height={isMobile ? 34 : 40}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </IconButton>

      {/* Profile Popover */}
      <ProfilePopover
        open={isProfileOpen}
        isMobile={isMobile}
        anchorEl={profileAnchorEl}
        onClose={handleProfileClose}
        userName="Aelia Kos"
        userAvatar="/charactor.png"
      />
    </Box>
  );
};

export default Navbar;
