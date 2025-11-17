import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useThemeColors } from '@/hooks';

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: 'Import CSV', path: '/import' },
  { label: 'Your Contacts', path: '/your-contacts' },
  { label: 'Add a Contact', path: '/add-contact' },
];

const ArrowIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10.5 19.9062C5.31125 19.9062 1.09375 15.6888 1.09375 10.5C1.09375 5.31125 5.31125 1.09375 10.5 1.09375C15.6888 1.09375 19.9062 5.31125 19.9062 10.5C19.9062 15.6888 15.6888 19.9062 10.5 19.9062ZM10.5 2.40625C6.0375 2.40625 2.40625 6.0375 2.40625 10.5C2.40625 14.9625 6.0375 18.5938 10.5 18.5938C14.9625 18.5938 18.5938 14.9625 18.5938 10.5C18.5938 6.0375 14.9625 2.40625 10.5 2.40625Z" 
      fill={color}
    />
    <path 
      d="M9.39771 14.2451C9.23146 14.2451 9.06521 14.1839 8.93396 14.0526C8.68021 13.7989 8.68021 13.3789 8.93396 13.1251L11.559 10.5001L8.93396 7.87514C8.68021 7.62139 8.68021 7.20139 8.93396 6.94764C9.18771 6.69389 9.60772 6.69389 9.86147 6.94764L12.9502 10.0364C13.204 10.2901 13.204 10.7101 12.9502 10.9639L9.86147 14.0526C9.73022 14.1839 9.56396 14.2451 9.39771 14.2451Z" 
      fill={color}
    />
  </svg>
);

const Sidebar = () => {
  const router = useRouter();
  const themeColors = useThemeColors();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const isActive = (path: string) => {
    return router.pathname.endsWith(path);
  };

  const handleNavigate = (path: string) => {
    // Preserve existing URL and append the new path
    const basePath = router.pathname.split('/').slice(0, -1).join('/');
    router.push(`${basePath}${path}`);
  };

  return (
    <Box
      sx={{
        width: '372px',
        padding: '20px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {menuItems.map((item) => {
        const isItemActive = isActive(item.path);
        const isHovered = hoveredItem === item.path;
        const textColor = isItemActive || isHovered 
          ? themeColors.pantone.main 
          : themeColors.text.secondary;

        return (
          <Box
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              paddingBottom: '5px',
            }}
          >
            <Typography
              variant="bodyRegular"
              sx={{
                color: textColor,
                transition: 'color 0.2s ease',
              }}
            >
              {item.label}
            </Typography>
            <ArrowIcon color={textColor} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Sidebar;