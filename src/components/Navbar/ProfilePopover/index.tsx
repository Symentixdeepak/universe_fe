import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useThemeColors } from '@/hooks';
import { SvgIcon, IconName } from '@/components';

interface ProfileMenuItem {
  id: string;
  label: string;
  icon: IconName;
  color?: string;
  onClick?: () => void;
}

interface ProfilePopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  userName?: string;
  userAvatar?: string;
}

export const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  open,
  anchorEl,
  onClose,
  userName = "Aelia Kos",
  userAvatar = "/charactor.png"
}) => {
  const themeColors = useThemeColors();

  const menuItems: ProfileMenuItem[] = [
    {
      id: 'view-profile',
      label: 'View Profile',
      icon: 'setting_nav',
      onClick: () => {
        console.log('View Profile clicked');
        onClose();
      }
    },
    {
      id: 'manage-account',
      label: 'Manage Account',
      icon: 'setting_nav',
      onClick: () => {
        console.log('Manage Account clicked');
        onClose();
      }
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'notification_nav',
      onClick: () => {
        console.log('Notifications clicked');
        onClose();
      }
    },
    {
      id: 'sign-out',
      label: 'Sign out',
      icon: 'setting_nav',
      color: '#BE0000',
      onClick: () => {
        console.log('Sign out clicked');
        onClose();
      }
    }
  ];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPopover-paper': {
          mt: 1,
          borderRadius: '16px',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
          bgcolor: themeColors.background.primary,
          border: `1px solid ${themeColors.border.secondary}`,
          minWidth: '240px',
          overflow: 'visible',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* User Info Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            pb: 2,
            borderBottom: `1px solid ${themeColors.border.secondary}`,
          }}
        >
          <Avatar
            src={userAvatar}
            alt={userName}
            sx={{
              width: 48,
              height: 48,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: themeColors.pantone.main,
              fontWeight: 600,
            }}
          >
            {userName}
          </Typography>
        </Box>

        {/* Menu Items */}
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={item.onClick}
              sx={{
                borderRadius: '8px',
                cursor: 'pointer',
                px: 1,
                py: 1.5,
                mb: 0.5,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: themeColors.pantone.light,
                  '& .MuiListItemText-primary': {
                    color: item.id === 'sign-out' 
                      ? item.color 
                      : themeColors.pantone.light,
                  }
                },
                '&:active': {
                  bgcolor: themeColors.pantone.dark,
                  '& .MuiListItemText-primary': {
                    color: item.id === 'sign-out' 
                      ? item.color 
                      : themeColors.pantone.dark,
                  }
                },
                '&:last-child': {
                  mb: 0,
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '32px',
                }}
              >
                <SvgIcon
                  name={item.icon}
                  width={20}
                  height={20}
                  style={{
                    filter: item.id === 'sign-out' 
                      ? `brightness(0) saturate(100%) invert(14%) sepia(93%) saturate(7426%) hue-rotate(5deg) brightness(90%) contrast(115%)` 
                      : 'none',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: {
                    color: item.id === 'sign-out' 
                      ? item.color 
                      : themeColors.text.primary,
                    fontWeight: 500,
                    transition: 'color 0.2s ease-in-out',
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  );
};

export default ProfilePopover;