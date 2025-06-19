import React, { useState, useEffect } from 'react';
import Enemy from './Enemy';

// Componente para gerenciar inimigos FUNCIONAIS
export default function EnemyManager({ 
  enemies = [], 
  playerPosition,
  onEnemyContact 
}) {
  const [activeEnemies, setActiveEnemies] = useState([]);
  
  // Inicializar inimigos com posições e comportamentos
  useEffect(() => {
    const initializedEnemies = enemies.map((enemy, index) => ({
      ...enemy,
      id: `enemy-${index}`,
      minX: enemy.x - (enemy.patrolRange || 100),
      maxX: enemy.x + (enemy.patrolRange || 100),
      speed: enemy.speed || 1,
    }));
    
    setActiveEnemies(initializedEnemies);
  }, [enemies]);
  
  // Função para lidar com contato com inimigo
  const handleEnemyContact = (enemy) => {
    if (onEnemyContact) {
      onEnemyContact(enemy);
    }
  };
  
  return (
    <>
      {activeEnemies.map((enemy, index) => (
        <Enemy
          key={enemy.id}
          enemy={enemy}
          position={{ x: enemy.x, y: enemy.y }}
          playerPosition={playerPosition}
          onContact={handleEnemyContact}
        />
      ))}
    </>
  );
}

