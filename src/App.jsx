import { useState, useEffect } from 'react'
import './App.css'
import MainMenu from './components/MainMenu'
import GameIntro from './components/GameIntro'
import VictoryScreen from './components/VictoryScreen'
import DialogueBox from './components/DialogueBox'
import HistoricalPuzzle from './components/HistoricalPuzzle'
import GameLevel from './components/GameLevel'
import GameHUD from './components/GameHUD'
import Inventory from './components/Inventory'
import './components/GameAnimations.css'

// Importar assets dos personagens
import anaImg from './assets/personagens/ana-personagem.png'
import lucasImg from './assets/personagens/lucas-personagem.png'
import sofiaImg from './assets/personagens/sofia-personagem.png'
import zeImg from './assets/personagens/ze-papagaio.png'

// Importar cenários
import fazenda1830 from './assets/cenarios/fazenda-1830.png'
import vila1900 from './assets/cenarios/vila-1900.png'
import capital1940 from './assets/cenarios/capital-1940.png'
import boaVistaModerna from './assets/cenarios/boa-vista-moderna.png'

// Personagens do jogo
const CHARACTERS = [
  {
    id: 'ana',
    name: 'Ana',
    image: anaImg,
    description: 'Uma jovem curiosa e inteligente que adora história'
  },
  {
    id: 'lucas', 
    name: 'Lucas',
    image: lucasImg,
    description: 'Um garoto aventureiro que gosta de explorar'
  },
  {
    id: 'sofia',
    name: 'Sofia',
    image: sofiaImg,
    description: 'Uma menina corajosa que resolve problemas'
  },
  {
    id: 'ze',
    name: 'Zé Papagaio',
    image: zeImg,
    description: 'O papagaio sábio que conhece todos os segredos de Roraima'
  }
]

// Estados do jogo
const GAME_STATES = {
  MENU: 'menu',
  INTRO: 'intro',
  PLAYING: 'playing',
  DIALOGUE: 'dialogue',
  PUZZLE: 'puzzle',
  TRANSITION: 'transition',
  VICTORY: 'victory',
  INVENTORY: 'inventory'
}

// Épocas históricas
const ERAS = {
  FAZENDA_1830: {
    id: 'fazenda_1830',
    name: 'Fazenda Boa Vista (1830)',
    background: fazenda1830,
    description: 'O início de tudo: a fazenda de gado de Inácio Lopes de Magalhães',
    colors: {
      primary: '#2D5016',
      secondary: '#8B4513',
      accent: '#F5DEB3'
    },
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'grass' },
      // Plataformas adicionais
      { x: 300, y: 450, width: 200, height: 20, type: 'wood' },
      { x: 600, y: 400, width: 150, height: 20, type: 'wood' },
      { x: 850, y: 350, width: 200, height: 20, type: 'wood' },
      { x: 1200, y: 400, width: 250, height: 20, type: 'wood' },
      { x: 1500, y: 350, width: 200, height: 20, type: 'wood' },
      { x: 1800, y: 300, width: 200, height: 20, type: 'wood' },
    ],
    // Itens colecionáveis com explicações educativas detalhadas
    items: [
      { 
        x: 380, y: 420, type: 'lamp', name: 'Lamparina Antiga', 
        description: 'Lamparina a óleo usada pelos primeiros habitantes da fazenda.',
        educationalText: 'Esta lamparina representa a vida simples dos primeiros colonos. Sem energia elétrica, eles dependiam de lamparinas a óleo de mamona ou querosene para iluminar suas casas durante a noite. Era um item essencial para a sobrevivência na fronteira.',
        historicalContext: 'Em 1830, Boa Vista era apenas uma fazenda isolada. Os habitantes viviam de forma muito simples, criando gado e plantando para subsistência.',
        points: 15, collected: false 
      },
      { 
        x: 720, y: 370, type: 'document', name: 'Escritura da Fazenda', 
        description: 'Documento original da fundação da Fazenda Boa Vista.',
        educationalText: 'Este documento marca o início oficial de Boa Vista. A fazenda foi estabelecida por Inácio Lopes de Magalhães, que recebeu uma sesmaria (concessão de terra) da Coroa Portuguesa para criar gado na região.',
        historicalContext: 'As sesmarias eram a forma como Portugal distribuía terras no Brasil colonial. Esta fazenda se tornaria o núcleo da futura capital de Roraima.',
        points: 25, collected: false 
      },
      { 
        x: 1300, y: 350, type: 'artifact', name: 'Ferradura Antiga', 
        description: 'Ferradura usada nos cavalos da fazenda original.',
        educationalText: 'Os cavalos eram fundamentais para o transporte e trabalho na fazenda. Esta ferradura mostra como os colonos cuidavam de seus animais, essenciais para a sobrevivência na região isolada do extremo norte do Brasil.',
        historicalContext: 'O gado e os cavalos eram a base da economia local. A pecuária foi a primeira atividade econômica importante da região que hoje é Boa Vista.',
        points: 20, collected: false 
      },
    ],
    // Inimigos
    enemies: [
      { x: 500, y: 500, type: 'spirit', name: 'Espírito da Floresta', health: 1, damage: 1, movePattern: 'patrol' },
      { x: 1000, y: 500, type: 'spirit', name: 'Espírito da Floresta', health: 1, damage: 1, movePattern: 'patrol' },
      { x: 1600, y: 500, type: 'spirit', name: 'Espírito da Floresta', health: 1, damage: 1, movePattern: 'patrol' },
    ]
  },
  VILA_1900: {
    id: 'vila_1900',
    name: 'Vila de Boa Vista (1900)',
    background: vila1900,
    description: 'A transformação em vila e o crescimento urbano',
    colors: {
      primary: '#1E90FF',
      secondary: '#32CD32',
      accent: '#FFA500'
    },
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
      // Plataformas adicionais (edifícios, etc.)
      { x: 200, y: 450, width: 300, height: 20, type: 'stone' },
      { x: 600, y: 400, width: 200, height: 20, type: 'stone' },
      { x: 900, y: 350, width: 250, height: 20, type: 'stone' },
      { x: 1300, y: 400, width: 200, height: 20, type: 'stone' },
      { x: 1600, y: 350, width: 300, height: 20, type: 'stone' },
    ],
    // Itens colecionáveis
    items: [
      { x: 250, y: 400, type: 'document', name: 'Decreto de Vila', description: 'Documento que elevou Boa Vista à categoria de vila.', points: 15, collected: false },
      { x: 700, y: 350, type: 'artifact', name: 'Sino da Igreja', description: 'Miniatura do sino da primeira igreja da vila.', points: 10, collected: false },
      { x: 1400, y: 350, type: 'artifact', name: 'Moeda Antiga', description: 'Moeda do período imperial usada na vila.', points: 10, collected: false },
    ],
    // Inimigos
    enemies: [
      { x: 400, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
      { x: 1100, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
      { x: 1700, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
    ]
  },
  CAPITAL_1940: {
    id: 'capital_1940',
    name: 'Capital do Território Federal (1944)',
    background: capital1940,
    description: 'A modernização e o planejamento urbano radial',
    colors: {
      primary: '#003366',
      secondary: '#DAA520',
      accent: '#F8F8FF'
    },
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
      // Plataformas adicionais (edifícios governamentais, etc.)
      { x: 150, y: 450, width: 250, height: 20, type: 'stone' },
      { x: 500, y: 400, width: 300, height: 20, type: 'stone' },
      { x: 900, y: 350, width: 200, height: 20, type: 'stone' },
      { x: 1200, y: 300, width: 250, height: 20, type: 'stone' },
      { x: 1500, y: 250, width: 300, height: 20, type: 'stone' },
      { x: 1850, y: 200, width: 150, height: 20, type: 'stone' },
    ],
    // Itens colecionáveis
    items: [
      { x: 200, y: 400, type: 'document', name: 'Decreto Territorial', description: 'Decreto de criação do Território Federal de Roraima.', points: 15, collected: false },
      { x: 600, y: 350, type: 'artifact', name: 'Planta Urbana', description: 'Planta original do planejamento radial de Boa Vista.', points: 15, collected: false },
      { x: 1300, y: 250, type: 'artifact', name: 'Distintivo Oficial', description: 'Distintivo dos primeiros funcionários públicos do território.', points: 10, collected: false },
    ],
    // Inimigos
    enemies: [
      { x: 350, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
      { x: 800, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
      { x: 1400, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
    ]
  },
  BOA_VISTA_MODERNA: {
    id: 'boa_vista_moderna',
    name: 'Boa Vista Moderna',
    background: boaVistaModerna,
    description: 'A cidade contemporânea: tecnologia e sustentabilidade',
    colors: {
      primary: '#0066CC',
      secondary: '#00CC66',
      accent: '#FF6600'
    },
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
      // Plataformas adicionais (edifícios modernos, etc.)
      { x: 100, y: 450, width: 200, height: 20, type: 'stone' },
      { x: 400, y: 400, width: 250, height: 20, type: 'stone' },
      { x: 750, y: 350, width: 200, height: 20, type: 'stone' },
      { x: 1050, y: 300, width: 250, height: 20, type: 'stone' },
      { x: 1400, y: 250, width: 200, height: 20, type: 'stone' },
      { x: 1700, y: 200, width: 300, height: 20, type: 'stone' },
    ],
    // Itens colecionáveis
    items: [
      { x: 150, y: 400, type: 'document', name: 'Constituição Estadual', description: 'Documento da criação do Estado de Roraima.', points: 15, collected: false },
      { x: 500, y: 350, type: 'artifact', name: 'Maquete da Orla', description: 'Miniatura da Orla Taumanan, cartão postal da cidade.', points: 10, collected: false },
      { x: 1500, y: 200, type: 'artifact', name: 'Placa Solar', description: 'Símbolo da sustentabilidade na Boa Vista moderna.', points: 10, collected: false },
    ],
    // Inimigos
    enemies: [
      { x: 300, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
      { x: 900, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
      { x: 1600, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
    ]
  }
}

// Componente Principal da Aplicação
function App() {
  const [gameState, setGameState] = useState(GAME_STATES.MENU)
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)
  const [currentEraIndex, setCurrentEraIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [knowledge, setKnowledge] = useState(0)
  const [health, setHealth] = useState(5)
  const [energy, setEnergy] = useState(100)
  const [inventory, setInventory] = useState([])
  const [activeDialogue, setActiveDialogue] = useState(null)
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [showInventory, setShowInventory] = useState(false)
  const [showCutscene, setShowCutscene] = useState(false)
  const [currentCutscene, setCurrentCutscene] = useState(null)
  const [showHistoricalInterlude, setShowHistoricalInterlude] = useState(false)
  const [currentHistoricalFigure, setCurrentHistoricalFigure] = useState(null)
  const [areasExplored, setAreasExplored] = useState([])
  const [achievements, setAchievements] = useState([])
  const [collectedItems, setCollectedItems] = useState([])
  
  const eras = Object.values(ERAS)
  const currentEra = eras[currentEraIndex]
  
  // Função para abrir puzzles históricos
  const handleChallengeClick = () => {
    setShowPuzzle(true)
  }
  
  // Função para completar puzzle
  const handlePuzzleComplete = (points) => {
    setKnowledge(prev => prev + points)
    setShowPuzzle(false)
    alert(`Parabéns! Você ganhou ${points} pontos de conhecimento!`)
  }
  
  // Função para fechar puzzle
  const handlePuzzleClose = () => {
    setShowPuzzle(false)
  }
  
  // Recuperar energia ao longo do tempo
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING && energy < 100) {
      const energyRecoveryInterval = setInterval(() => {
        setEnergy(prevEnergy => Math.min(prevEnergy + 5, 100));
      }, 1000);
      
      return () => clearInterval(energyRecoveryInterval);
    }
  }, [gameState, energy]);
  
  const handleStartGame = () => {
    setGameState(GAME_STATES.INTRO)
  }
  
  const handleContinueFromIntro = () => {
    setGameState(GAME_STATES.PLAYING)
  }
  
  const handleNextEra = () => {
    if (currentEraIndex < eras.length - 1) {
      setCurrentEraIndex(prev => prev + 1)
      setProgress(0)
    } else {
      setGameState(GAME_STATES.VICTORY)
    }
  }
  
  const handleDialogueClick = () => {
    setActiveDialogue({
      era: currentEra,
      character: CHARACTERS[currentCharacterIndex]
    })
  }
  
  const handleDialogueClose = () => {
    setActiveDialogue(null)
  }
  
  const handleKnowledgeGain = (points) => {
    setKnowledge(prev => prev + points)
  }
  
  const handleItemCollect = (index, item) => {
    const itemId = `${currentEra.id}-${index}`
    if (!collectedItems.includes(itemId)) {
      setCollectedItems(prev => [...prev, itemId])
      setInventory(prev => [...prev, item])
      setKnowledge(prev => prev + (item.points || 15))
      
      // Mostrar explicação educativa detalhada
      const educationalPopup = `
🎉 ITEM HISTÓRICO DESCOBERTO! 🎉

📜 ${item.name}

📖 O QUE É:
${item.description}

🎓 IMPORTÂNCIA HISTÓRICA:
${item.educationalText}

🏛️ CONTEXTO DA ÉPOCA:
${item.historicalContext}

💎 Conhecimento adquirido: +${item.points || 15} pontos!
📦 Item adicionado ao inventário!
      `.trim()
      
      alert(educationalPopup)
    }
  }
  
  const handleHealthChange = (delta) => {
    setHealth(prev => Math.max(0, Math.min(5, prev + delta)))
  }
  
  const handleEnergyChange = (delta) => {
    setEnergy(prev => Math.max(0, Math.min(100, prev + delta)))
  }
  
  const handleUseItem = (item) => {
    // Lógica para usar itens
    console.log('Usando item:', item)
  }
  
  const handleEnemyContact = (enemy) => {
    handleHealthChange(-1)
    handleEnergyChange(-10)
  }
  
  const handleExitReached = () => {
    handleNextEra()
  }
  
  // Renderização principal
  if (gameState === GAME_STATES.MENU) {
    return <MainMenu onStartGame={handleStartGame} />
  }
  
  if (gameState === GAME_STATES.INTRO) {
    return <GameIntro onContinue={handleContinueFromIntro} />
  }
  
  if (gameState === GAME_STATES.VICTORY) {
    return (
      <VictoryScreen 
        knowledge={knowledge}
        itemsCollected={inventory.length}
        onRestart={() => {
          setGameState(GAME_STATES.MENU)
          setCurrentEraIndex(0)
          setProgress(0)
          setKnowledge(0)
          setHealth(5)
          setEnergy(100)
          setInventory([])
          setCollectedItems([])
        }}
      />
    )
  }
  
  return (
    <div className="App">
      <GameHUD 
        era={currentEra}
        character={CHARACTERS[currentCharacterIndex]}
        progress={progress}
        knowledge={knowledge}
        health={health}
        energy={energy}
        onDialogueClick={handleDialogueClick}
        onChallengeClick={handleChallengeClick}
        onInventoryClick={() => setShowInventory(!showInventory)}
        onMapClick={() => console.log('Mapa clicado')}
      />
      
      <GameLevel
        era={currentEra}
        backgroundImage={currentEra.background}
        platforms={currentEra.platforms}
        items={currentEra.items}
        enemies={currentEra.enemies}
        character={CHARACTERS[currentCharacterIndex]}
        onCharacterChange={setCurrentCharacterIndex}
        onProgressChange={setProgress}
        onKnowledgeGain={handleKnowledgeGain}
        onHealthChange={handleHealthChange}
        onEnergyChange={handleEnergyChange}
        onUseItem={handleUseItem}
        onItemCollect={handleItemCollect}
        collectedItems={collectedItems}
        currentEraId={currentEra.id}
        onEnemyContact={handleEnemyContact}
        onExitReached={handleExitReached}
        onInventoryToggle={() => setShowInventory(!showInventory)}
      />
      
      {/* BOTÃO DE PORTAL SEMPRE VISÍVEL */}
      <button 
        onClick={() => {
          console.log('Portal clicado - avançando para próxima era!');
          handleNextEra();
        }}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          width: '120px',
          height: '120px',
          backgroundColor: '#9C27B0',
          color: 'white',
          border: '4px solid #FFD700',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(156, 39, 176, 0.8)',
          animation: 'portalPulse 2s infinite ease-in-out'
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '5px' }}>🌀</div>
        <div style={{ fontSize: '12px' }}>PORTAL</div>
        <div style={{ fontSize: '10px' }}>Próxima Era</div>
      </button>
      
      {showInventory && (
        <Inventory
          items={inventory}
          onClose={() => setShowInventory(false)}
          onUseItem={handleUseItem}
        />
      )}
      
      {activeDialogue && (
        <DialogueBox
          era={activeDialogue.era}
          character={activeDialogue.character}
          onClose={handleDialogueClose}
          onKnowledgeGain={handleKnowledgeGain}
        />
      )}
      
      {showPuzzle && (
        <HistoricalPuzzle
          era={currentEra}
          onComplete={handlePuzzleComplete}
          onClose={handlePuzzleClose}
        />
      )}
    </div>
  )
}

export default App

