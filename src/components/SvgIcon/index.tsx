import React from 'react';
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
}) => {
  const iconSrc = iconMap[name];

  if (!iconSrc) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  // Merge custom dimensions with existing style
  const mergedStyle = {
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
};

export default SvgIcon;