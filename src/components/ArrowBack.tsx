import React, { useState } from 'react';
import { IconButton, IconButtonProps, styled } from '@mui/material';
import { useThemeColors } from '@/hooks';

interface ArrowBackProps extends Omit<IconButtonProps, 'children' | 'size'> {
  selected?: boolean;
  iconSize?: number;
  buttonSize?: 'small' | 'medium' | 'large';
}

// Custom styled IconButton with theme-aware animations
const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => !['themeColors', 'isSelected', 'isHovered', 'isClicked'].includes(prop as string),
})<{ 
  themeColors: ReturnType<typeof useThemeColors>;
  isSelected: boolean;
  isHovered: boolean;
  isClicked: boolean;
}>(({ theme, themeColors, isSelected, isHovered, isClicked }) => {
  const isDark = theme.palette.mode === 'dark';
  
  // Determine colors based on theme and state
  let iconColor;
  
  if (isClicked) {
    iconColor = themeColors.pantone.dark;
  } else if (isSelected) {
    iconColor = isDark ? themeColors.text.tertiary : themeColors.text.tertiary; // white dark : black dark
  } else if (isHovered) {
    iconColor = themeColors.pantone.main;
  } else {
    iconColor = isDark ? themeColors.text.primary : themeColors.text.primary; // white main : black main
  }

  return {
    padding: 8,
    borderRadius: '50%',
    transition: 'all 300ms ease-out',
    
    '& svg': {
      transition: 'all 300ms ease-out',
      '& path': {
        stroke: iconColor,
        transition: 'stroke 300ms ease-out',
      }
    },

    '&:hover': {
      backgroundColor: 'transparent',
      '& svg path': {
        stroke: themeColors.pantone.main,
      }
    },

    '&:active': {
      '& svg path': {
        stroke: themeColors.pantone.dark,
      }
    },

    ...(isSelected && {
      '& svg path': {
        stroke: isDark ? themeColors.text.tertiary : themeColors.text.tertiary,
      }
    }),
  };
});

const ArrowBack: React.FC<ArrowBackProps> = ({ 
  selected = false, 
  iconSize = 21.5,
  buttonSize = 'medium',
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props 
}) => {
  const themeColors = useThemeColors();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    setIsClicked(false);
    onMouseLeave?.(event);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    onMouseDown?.(event);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(false);
    onMouseUp?.(event);
  };

  return (
    <StyledIconButton
      themeColors={themeColors}
      isSelected={selected}
      isHovered={isHovered}
      isClicked={isClicked}
      size={buttonSize}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 512 512"
      >
        <path 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="32" 
          d="M249.38 336L170 256l79.38-80m-68.35 80H342"
        />
        <path 
          fill="none" 
          strokeMiterlimit="10" 
          strokeWidth="32" 
          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        />
      </svg>
    </StyledIconButton>
  );
};

export default ArrowBack;