import React from 'react';
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

  return (
    <Box
      sx={{
        width: '100%',
        height: '62px',
        padding: '15px 40px 15px  40px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
