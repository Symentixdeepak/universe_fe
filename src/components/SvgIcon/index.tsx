import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Icon mapping with all available SVG icons
const iconMap = {
  badgebig: '/assets/images/icons/badgebig.svg',
  chat_copy: '/assets/images/icons/chat_copy.svg',
  chat_dot: '/assets/images/icons/chat_dot.svg',
  chat_retry: '/assets/images/icons/chat_retry.svg',
  clock_reminder: '/assets/images/icons/clock_reminder.svg',
  cross: '/assets/images/icons/cross.svg',
  dashboard_nav: '/assets/images/icons/dashboard_nav.svg',
  location: '/assets/images/icons/location.svg',
  lock: '/assets/images/icons/lock.svg',
  my_universe_nav: '/assets/images/icons/my_universe_nav.svg',
  notice_i: '/assets/images/icons/notice_i.svg',
  notification_nav: '/assets/images/icons/notification_nav.svg',
  pending_conn_nav: '/assets/images/icons/pending_conn_nav.svg',
  peoplebig: '/assets/images/icons/peoplebig.svg',
  search_nav: '/assets/images/icons/search_nav.svg',
  setting_nav: '/assets/images/icons/setting_nav.svg',
  timerBig: '/assets/images/icons/timerBig.svg',
  unlock: '/assets/images/icons/unlock.svg',
  zoom_search_nav: '/assets/images/icons/zoom_search_nav.svg',
  signout:"/assets/images/icons/signout.svg",
  profile:"/assets/images/icons/profile.svg",
  three_dot:"/assets/images/icons/three_dot.svg",
  user_tick:"/assets/images/icons/user_tick.svg",
  search_icon:"/assets/images/icons/search_bar.svg",
  attach:"/assets/images/icons/attach_icon.svg",
  send_icon:"/assets/images/icons/sendChat.svg",
  profile_cricle:"/assets/images/icons/profile_circle.svg",
  add_circle:"/assets/images/icons/add_circle.svg",
  copy:"/assets/images/icons/copy.svg",
};

export type IconName = keyof typeof iconMap;

interface SvgIconProps {
  name: IconName;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  quality?: number;
  priority?: boolean;
  color?: string;
  hoverColor?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  width = 20,
  height = 20,
  alt,
  className,
  style,
  quality = 100,
  priority = false,
  color,
  hoverColor,
}) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const iconSrc = iconMap[name];

  if (!iconSrc) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  // Fetch and parse SVG content when color is provided
  useEffect(() => {
    if (color || hoverColor) {
      setIsLoading(true);
      fetch(iconSrc)
        .then(response => response.text())
        .then(svgText => {
          setSvgContent(svgText);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading SVG:', error);
          setIsLoading(false);
        });
    }
  }, [iconSrc, color, hoverColor]);

  // If no color is specified, use the regular Image component
  if (!color && !hoverColor) {
    const mergedStyle: React.CSSProperties = {
      ...style,
      ...(width !== 20 && { width }),
      ...(height !== 20 && { height }),
    };

    return (
      <Image
        src={iconSrc}
        alt={alt || name}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        className={className}
        style={mergedStyle}
      />
    );
  }

  // For colored icons, render inline SVG
  if (isLoading || !svgContent) {
    return (
      <div 
        style={{ 
          width, 
          height, 
          display: 'inline-block',
          // backgroundColor: '#f0f0f0',
          ...style 
        }} 
      />
    );
  }

  // Parse and modify SVG content to apply colors
  const modifiedSvg = svgContent
    .replace(/width="[^"]*"/g, `width="${width}"`)
    .replace(/height="[^"]*"/g, `height="${height}"`)
    .replace(/fill="[^"]*"/g, `fill="${color || '#000000'}"`)
    .replace(/<path(?![^>]*fill=)/g, `<path fill="${color || '#000000'}"`)
    .replace(/<circle(?![^>]*fill=)/g, `<circle fill="${color || '#000000'}"`)
    .replace(/<rect(?![^>]*fill=)/g, `<rect fill="${color || '#000000'}"`);

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        transition: 'all 0.2s ease-in-out',
      }}
      dangerouslySetInnerHTML={{ __html: modifiedSvg }}
      onMouseEnter={hoverColor ? (e) => {
        const svgElement = e.currentTarget.querySelector('svg');
        if (svgElement) {
          const elements = svgElement.querySelectorAll('path, circle, rect, polygon');
          elements.forEach(el => {
            (el as SVGElement).setAttribute('fill', hoverColor);
          });
        }
      } : undefined}
      onMouseLeave={color ? (e) => {
        const svgElement = e.currentTarget.querySelector('svg');
        if (svgElement) {
          const elements = svgElement.querySelectorAll('path, circle, rect, polygon');
          elements.forEach(el => {
            (el as SVGElement).setAttribute('fill', color);
          });
        }
      } : undefined}
    />
  );
};

export default SvgIcon;