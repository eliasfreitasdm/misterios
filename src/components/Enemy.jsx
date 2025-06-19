import React, { useState, useEffect } from 'react';

// Componente para inimigos FUNCIONAIS
export default function Enemy({ 
  enemy, 
  position, 
  playerPosition,
  onContact 
}) {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [direction, setDirection] = useState(1); // 1 para direita, -1 para esquerda
  const [isActive, setIsActive] = useState(true);
  
  // Movimento automático do inimigo
  useEffect(() => {
    if (!isActive) return;
    
    const moveInterval = setInterval(() => {
      setCurrentPosition(prev => {
        let newX = prev.x + (enemy.speed || 1) * direction;
        
        // Inverter direção se atingir limites
        if (newX <= enemy.minX || newX >= enemy.maxX) {
          setDirection(d => -d);
          newX = prev.x;
        }
        
        return { ...prev, x: newX };
      });
    }, 100);
    
    return () => clearInterval(moveInterval);
  }, [direction, isActive, enemy]);
  
  // Verificar colisão com jogador
  useEffect(() => {
    if (!playerPosition || !isActive) return;
    
    const distance = Math.sqrt(
      Math.pow(currentPosition.x - playerPosition.x, 2) + 
      Math.pow(currentPosition.y - playerPosition.y, 2)
    );
    
    if (distance < 60) { // Raio de colisão
      if (onContact) {
        onContact(enemy);
      }
      setIsActive(false); // Desativar temporariamente
      
      // Reativar após 2 segundos
      setTimeout(() => setIsActive(true), 2000);
    }
  }, [currentPosition, playerPosition, enemy, onContact, isActive]);
  
  // Determinar sprite do inimigo
  const getEnemySprite = () => {
    switch (enemy.type) {
      case 'forest_spirit':
        return '/src/assets/inimigos/espirito-floresta.png';
      case 'mystic_jaguar':
        return '/src/assets/inimigos/jaguar-mistico.png';
      default:
        return null;
    }
  };
  
  const sprite = getEnemySprite();
  
  // Estilos para o inimigo
  const enemyStyle = {
    position: 'absolute',
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    width: '60px',
    height: '60px',
    backgroundImage: sprite ? `url(${sprite})` : 'none',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transform: `scaleX(${direction})`, // Espelhar sprite baseado na direção
    transition: 'transform 0.3s ease',
    opacity: isActive ? 1 : 0.5,
    zIndex: 80,
    filter: isActive ? 'none' : 'grayscale(100%)',
  };
  
  // Se não há sprite, usar emoji como fallback
  if (!sprite) {
    return (
      <div 
        className="enemy"
        style={{
          ...enemyStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          background: 'radial-gradient(circle, rgba(255,0,0,0.3), transparent)',
          borderRadius: '50%',
        }}
        title={enemy.name}
      >
        {enemy.type === 'forest_spirit' ? '👻' : '🐆'}
      </div>
    );
  }
  
  return (
    <div 
      className="enemy"
      style={enemyStyle}
      title={enemy.name}
    >
      {/* Indicador de vida/status */}
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '4px',
          background: isActive ? '#4CAF50' : '#FF5722',
          borderRadius: '2px',
          border: '1px solid white',
        }}
      />
    </div>
  );
}

