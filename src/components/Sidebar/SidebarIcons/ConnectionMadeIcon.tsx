import React from 'react';
import Image from 'next/image';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

const ConnectionMadeIcon: React.FC<IconProps> = ({
  color = '#4E4E4E',
  width = 17,
  height = 17,
}) => {
  // Use colored icon when color is not the default (indicating hover, click, or active state)
  const isActive = color !== '#4E4E4E';
  
  const imageSrc = !isActive 
    ? '/assets/images/icons/conn_made_color.png'
    : '/assets/images/icons/conn_made_defualt.png';

  return (
    <Image
      src={imageSrc}
      alt="Connection Made"
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  );
};

export default ConnectionMadeIcon;
