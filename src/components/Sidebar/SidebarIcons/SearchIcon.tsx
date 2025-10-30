import React from 'react';

interface SearchIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({ 
  color = "#4E4E4E", 
  width = 20, 
  height = 20 
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M9.58317 17.5C13.9554 17.5 17.4998 14.0377 17.4998 9.75833C17.4998 5.47896 13.9554 2.01667 9.58317 2.01667C5.2109 2.01667 1.6665 5.47896 1.6665 9.75833C1.6665 14.0377 5.2109 17.5 9.58317 17.5Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M18.3332 18.3333L16.6665 16.6667" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;