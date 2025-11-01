import React from 'react';

interface ProfileIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ 
  color = "#4E4E4E", 
  width = 17, 
  height = 17 
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M8.5 2.125C10.5 2.125 12.125 3.75 12.125 5.75C12.125 7.75 10.5 9.375 8.5 9.375C6.5 9.375 4.875 7.75 4.875 5.75C4.875 3.75 6.5 2.125 8.5 2.125ZM8.5 3.1875C7.08594 3.1875 5.9375 4.33594 5.9375 5.75C5.9375 7.16406 7.08594 8.3125 8.5 8.3125C9.91406 8.3125 11.0625 7.16406 11.0625 5.75C11.0625 4.33594 9.91406 3.1875 8.5 3.1875Z" 
        fill={color}
      />
      <path 
        d="M8.5 10.625C5.46875 10.625 3 13.0938 3 16.125C3 16.4375 3.25 16.6875 3.5625 16.6875C3.875 16.6875 4.125 16.4375 4.125 16.125C4.125 13.7188 6.09375 11.75 8.5 11.75C10.9062 11.75 12.875 13.7188 12.875 16.125C12.875 16.4375 13.125 16.6875 13.4375 16.6875C13.75 16.6875 14 16.4375 14 16.125C14 13.0938 11.5312 10.625 8.5 10.625Z" 
        fill={color}
      />
    </svg>
  );
};

export default ProfileIcon;