import React from 'react';

export default function Platform({ x, y, width, height, type = 'normal', texture }) {
  // Estilos para diferentes tipos de plataformas
  const platformStyles = {
    normal: {
      backgroundColor: '#8B4513',
      borderTop: '4px solid #A0522D',
      borderLeft: '2px solid #A0522D',
      borderRight: '2px solid #6B2E0E',
      borderBottom: '4px solid #6B2E0E',
    },
    grass: {
      backgroundColor: '#8B4513',
      borderTop: '4px solid #228B22',
      borderLeft: '2px solid #A0522D',
      borderRight: '2px solid #6B2E0E',
      borderBottom: '4px solid #6B2E0E',
    },
    stone: {
      backgroundColor: '#708090',
      borderTop: '4px solid #A9A9A9',
      borderLeft: '2px solid #A9A9A9',
      borderRight: '2px solid #4F4F4F',
      borderBottom: '4px solid #4F4F4F',
    },
    wood: {
      backgroundColor: '#CD853F',
      borderTop: '4px solid #DEB887',
      borderLeft: '2px solid #DEB887',
      borderRight: '2px solid #8B5A2B',
      borderBottom: '4px solid #8B5A2B',
    },
    invisible: {
      backgroundColor: 'transparent',
      border: 'none',
    }
  };
  
  // Estilo base da plataforma
  const baseStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    ...platformStyles[type],
  };
  
  // Se uma textura for fornecida, usá-la como background
  const style = texture ? {
    ...baseStyle,
    backgroundImage: `url(${texture})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat-x',
    border: 'none',
  } : baseStyle;
  
  return (
    <div className={`platform platform-${type}`} style={style} />
  );
}

