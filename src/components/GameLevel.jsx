import { useState, useEffect, useRef } from 'react';
import Player from './Player';
import Platform from './Platform';
import ItemManager from './ItemManager';
import EnemyManager from './EnemyManager';

export default function GameLevel({ 
  era, 
  backgroundImage, 
  platforms = [], 
  items = [], 
  enemies = [],
  collectedItems = [], // Novo prop para itens coletados
  currentEraId = '', // Novo prop para ID da era atual
  onItemCollect,
  onEnemyContact,
  onExitReached,
  onInventoryToggle,
  onEnergyChange,
  onUseItem
}) {
  // Estado do nível
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });
  const [levelWidth, setLevelWidth] = useState(2000); // Largura padrão do nível
  const [levelHeight, setLevelHeight] = useState(600); // Altura padrão do nível
  const [activeCharacter, setActiveCharacter] = useState('ana'); // Personagem ativo
  
  // Referência para o contêiner do nível
  const levelContainerRef = useRef(null);
  
  // Configurar dimensões do nível
  useEffect(() => {
    if (levelContainerRef.current) {
      const containerWidth = levelContainerRef.current.clientWidth;
      const containerHeight = levelContainerRef.current.clientHeight;
      
      // Ajustar limites do nível com base no tamanho do contêiner
      setLevelWidth(Math.max(containerWidth, 2000)); // Nível deve ser pelo menos 2000px de largura
      setLevelHeight(containerHeight);
    }
  }, []);
  
  // Atualizar posição da câmera para seguir o jogador
  useEffect(() => {
    if (levelContainerRef.current) {
      const containerWidth = levelContainerRef.current.clientWidth;
      const containerHeight = levelContainerRef.current.clientHeight;
      
      // Calcular posição da câmera para manter o jogador centralizado
      let cameraX = playerPosition.x - containerWidth / 2;
      let cameraY = playerPosition.y - containerHeight / 2;
      
      // Limitar a câmera aos limites do nível
      cameraX = Math.max(0, Math.min(cameraX, levelWidth - containerWidth));
      cameraY = Math.max(0, Math.min(cameraY, levelHeight - containerHeight));
      
      setCameraPosition({ x: cameraX, y: cameraY });
    }
  }, [playerPosition, levelWidth, levelHeight]);
  
  // Lidar com mudança de personagem
  const handleCharacterSwitch = (character) => {
    setActiveCharacter(character);
  };
  
  // Lidar com mudança de posição do jogador
  const handlePlayerPositionChange = (newPosition) => {
    setPlayerPosition(newPosition);
    
    // Verificar se chegou à saída do nível
    if (onExitReached && 
        Math.abs(newPosition.x - levelWidth + 100) < 50 && 
        newPosition.y > levelHeight - 150) {
      onExitReached();
    }
  };
  
  // Lidar com coleta de item
  const handleItemCollect = (item, index) => {
    // Notificar o componente pai
    if (onItemCollect) {
      onItemCollect(index, item);
    }
  };
  
  // Lidar com contato com inimigo
  const handleEnemyContact = (enemy, index) => {
    if (onEnemyContact) {
      onEnemyContact(index, enemy);
    }
  };
  
  return (
    <div 
      ref={levelContainerRef}
      className="game-level-container"
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 80px)', // Altura total menos o HUD
        overflow: 'hidden',
      }}
    >
      <div 
        className="game-level"
        style={{
          position: 'absolute',
          width: `${levelWidth}px`,
          height: `${levelHeight}px`,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${-cameraPosition.x}px, ${-cameraPosition.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Renderizar plataformas */}
        {platforms.map((platform, index) => (
          <Platform
            key={`platform-${index}`}
            x={platform.x}
            y={platform.y}
            width={platform.width}
            height={platform.height}
            type={platform.type || 'normal'}
            texture={platform.texture}
          />
        ))}
        
        {/* Gerenciador de itens colecionáveis */}
        <ItemManager
          items={items}
          playerPosition={playerPosition}
          collectedItems={collectedItems} // Passar itens coletados
          currentEraId={currentEraId} // Passar ID da era atual
          onItemCollect={handleItemCollect}
        />
        
        {/* Gerenciador de inimigos */}
        <EnemyManager
          enemies={enemies}
          playerPosition={playerPosition}
          boundaries={{ left: 0, right: levelWidth - 48, top: 0, bottom: levelHeight - 64 }}
          onEnemyContact={handleEnemyContact}
        />
        
        {/* Renderizar jogador */}
        <Player
          character={activeCharacter}
          initialPosition={playerPosition}
          boundaries={{ left: 0, right: levelWidth - 64, top: 0, bottom: levelHeight }}
          platforms={platforms}
          onPositionChange={handlePlayerPositionChange}
          onInventoryToggle={onInventoryToggle}
          onEnergyChange={onEnergyChange}
          onUseItem={onUseItem}
        />
        
        {/* Saída do nível - PORTAL FUNCIONAL */}
        <div
          className="level-exit"
          onClick={() => {
            // Verificar se o jogador está próximo do portal
            const distance = Math.sqrt(
              Math.pow((levelWidth - 100) - playerPosition.x, 2) + 
              Math.pow((levelHeight - 150) - playerPosition.y, 2)
            );
            
            if (distance < 80) {
              onExitReached();
            } else {
              // Mostrar mensagem se estiver longe
              alert('Aproxime-se mais do portal para avançar para a próxima época!');
            }
          }}
          style={{
            position: 'absolute',
            right: '100px',
            bottom: '150px', // Posição acessível
            width: '80px',
            height: '120px',
            background: 'linear-gradient(to bottom, rgba(138,43,226,0.9), rgba(75,0,130,0.7))',
            borderRadius: '20px',
            boxShadow: '0 0 30px rgba(138,43,226,0.8)',
            animation: 'portalPulse 2s infinite ease-in-out',
            border: '3px solid rgba(255,255,255,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 150,
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '5px' }}>🌀</div>
          <div style={{ fontSize: '12px', textAlign: 'center' }}>PORTAL</div>
          <div style={{ fontSize: '10px', textAlign: 'center' }}>Próxima Era</div>
        </div>
      </div>
      
      {/* Controles de troca de personagem */}
      <div
        className="character-switch-controls"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          display: 'flex',
          gap: '10px',
          zIndex: 1000,
        }}
      >
        <button 
          onClick={() => handleCharacterSwitch('ana')}
          className={`character-button ${activeCharacter === 'ana' ? 'active' : ''}`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: activeCharacter === 'ana' ? '3px solid #4CAF50' : '1px solid #ccc',
            backgroundImage: 'url(/src/assets/personagens/ana-personagem.png)',
            backgroundSize: 'cover',
            cursor: 'pointer',
          }}
        />
        <button 
          onClick={() => handleCharacterSwitch('lucas')}
          className={`character-button ${activeCharacter === 'lucas' ? 'active' : ''}`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: activeCharacter === 'lucas' ? '3px solid #4CAF50' : '1px solid #ccc',
            backgroundImage: 'url(/src/assets/personagens/lucas-personagem.png)',
            backgroundSize: 'cover',
            cursor: 'pointer',
          }}
        />
        <button 
          onClick={() => handleCharacterSwitch('sofia')}
          className={`character-button ${activeCharacter === 'sofia' ? 'active' : ''}`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: activeCharacter === 'sofia' ? '3px solid #4CAF50' : '1px solid #ccc',
            backgroundImage: 'url(/src/assets/personagens/sofia-personagem.png)',
            backgroundSize: 'cover',
            cursor: 'pointer',
          }}
        />
        <button 
          onClick={() => handleCharacterSwitch('ze')}
          className={`character-button ${activeCharacter === 'ze' ? 'active' : ''}`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: activeCharacter === 'ze' ? '3px solid #4CAF50' : '1px solid #ccc',
            backgroundImage: 'url(/src/assets/personagens/ze-papagaio.png)',
            backgroundSize: 'cover',
            cursor: 'pointer',
          }}
        />
      </div>
      
      {/* Instruções de controle */}
      <div
        className="control-instructions"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 1000,
        }}
      >
        <p>WASD: Movimento</p>
        <p>Espaço: Pular</p>
        <p>1-4: Trocar personagem</p>
        <p>I: Inventário</p>
        <p>Q: Usar item</p>
      </div>
    </div>
  );
}

