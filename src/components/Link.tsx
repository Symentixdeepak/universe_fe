import React from 'react';
import NextLink from 'next/link';
import { styled, Typography, TypographyProps } from '@mui/material';
import { useThemeColors } from '@/hooks';

// Define link theme variants
type LinkTheme = 'auto' | 'black' | 'white' | 'pantone';

// Custom props interface
interface CustomLinkProps extends Omit<TypographyProps, 'color'> {
  href: string;
  theme?: LinkTheme;
  children: React.ReactNode;
  underline?: boolean;
  external?: boolean;
}

// Theme-aware styled Link component
const StyledLink = styled(Typography, {
  shouldForwardProp: (prop) => !['themeColors', 'linkTheme', 'showUnderline'].includes(prop as string),
})<{ 
  themeColors: ReturnType<typeof useThemeColors>;
  linkTheme: LinkTheme;
  showUnderline: boolean;
}>(({ themeColors, linkTheme, showUnderline }) => {
  // Determine effective theme
  const getColor = () => {
    switch (linkTheme) {
      case 'black':
        return themeColors.text.primary;
      case 'white':
        return themeColors.background.primary;
      case 'pantone':
        return themeColors.pantone.main;
      case 'auto':
      default:
        return themeColors.text.primary;
    }
  };

  const baseColor = getColor();
  const hoverColor = themeColors.pantone.main; // pantone main

  return {
    color: baseColor,
    cursor: 'pointer',
    textDecoration: showUnderline ? 'underline' : 'none',
    transition: 'all 300ms ease-out',
    
    '&:hover': {
      color: hoverColor,
      textDecoration: showUnderline ? 'underline' : 'none',
    },
    
    '&:focus': {
      color: hoverColor,
      outline: `2px solid ${hoverColor}`,
      outlineOffset: '2px',
    },
    
    '&:active': {
      color: hoverColor,
    }
  };
});

const Link: React.FC<CustomLinkProps> = ({
  href,
  children,
  theme = 'auto',
  underline = false,
  external = false,
  ...typographyProps
}) => {
  const themeColors = useThemeColors();

  const linkContent = (
    <StyledLink
      themeColors={themeColors}
      linkTheme={theme}
      showUnderline={underline}
      {...typographyProps}
    >
      {children}
    </StyledLink>
  );

  // External links
  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {linkContent}
      </a>
    );
  }

  // Internal Next.js links - Modern API (Next.js 13+)
  return (
    <NextLink href={href} style={{ textDecoration: 'none' }}>
      {linkContent}
    </NextLink>
  );
};

export default Link;