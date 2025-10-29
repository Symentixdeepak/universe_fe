import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import Image from 'next/image';
import { useThemeColors } from '@/hooks';

interface NavbarProps {
  isSidebarExpanded?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isSidebarExpanded = true
}) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Add shadow after scrolling 10px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '62px',
        padding: '15px 40px 15px 40px',
        position: 'relative', // Changed from fixed to relative
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: isScrolled 
          ? themeColors.background.primary 
          : `${themeColors.background.primary}F5`,
        boxShadow: isScrolled 
          ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
          : 'none',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        // borderBottom: isScrolled 
        //   ? `1px solid ${themeColors.border.secondary}` 
        //   : 'none',
      }}
    >
      {/* Left side - Logo */}
      <Box sx={{ ml: isSidebarExpanded ? 23 : 7 }}>
        <Image
          src="/assets/images/logos/universal_name_logo.png"
          alt="Universal Logo"
          width={148}
          height={40}
          style={{
            objectFit: 'contain',
            filter: themeColors?.isDark ? 'invert(1)' : 'inherit',
          }}
        />
      </Box>

      {/* Right side - User Avatar */}
      <IconButton
        sx={{
          padding: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/charactor.png"
          alt="User Avatar"
          width={40}
          height={40}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </IconButton>
    </Box>
  );
};

export default Navbar;
