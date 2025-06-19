import React, { useState, useEffect } from 'react';

// Componente para puzzles históricos FUNCIONAIS
export default function HistoricalPuzzle({ 
  era, 
  onComplete, 
  onClose 
}) {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  // Puzzles históricos para cada época
  const puzzles = {
    fazenda_1830: {
      type: 'timeline',
      title: 'Linha do Tempo da Fazenda Boa Vista',
      question: 'Ordene os eventos na sequência correta:',
      events: [
        'Inácio Lopes de Magalhães funda a fazenda',
        'Chegada do primeiro gado à região',
        'Construção das primeiras instalações',
        'Estabelecimento das rotas de navegação'
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Pense na sequência lógica: primeiro a fundação, depois o gado, as construções e por fim as rotas.',
      points: 25
    },
    vila_1900: {
      type: 'map',
      title: 'Mapa da Vila de Boa Vista',
      question: 'Onde ficava o centro da vila em 1900?',
      options: [
        'Próximo ao Rio Branco',
        'No alto de uma colina',
        'Longe do rio',
        'Na floresta'
      ],
      correct: 0,
      hint: 'As vilas sempre se desenvolviam próximas aos rios para facilitar o transporte.',
      points: 20
    },
    capital_1943: {
      type: 'planning',
      title: 'Planejamento Urbano de Boa Vista',
      question: 'Complete: O planejamento de Boa Vista foi inspirado em _____ com ruas em formato _____.',
      blanks: ['Paris', 'radial'],
      hint: 'Uma famosa cidade europeia conhecida por suas avenidas largas e formato em estrela.',
      points: 30
    },
    boa_vista_moderna: {
      type: 'facts',
      title: 'Boa Vista Hoje',
      question: 'Qual é a característica geográfica única de Boa Vista?',
      options: [
        'Única capital na Amazônia',
        'Única capital no Hemisfério Norte',
        'Maior capital do Norte',
        'Capital mais nova do Brasil'
      ],
      correct: 1,
      hint: 'Pense na localização geográfica em relação à linha do Equador.',
      points: 25
    }
  };
  
  useEffect(() => {
    if (era?.id && puzzles[era.id]) {
      setCurrentPuzzle(puzzles[era.id]);
    }
  }, [era]);
  
  const handleSubmit = () => {
    if (!currentPuzzle) return;
    
    let isCorrect = false;
    
    switch (currentPuzzle.type) {
      case 'timeline':
        // Verificar ordem dos eventos
        const userOrder = userAnswer.split(',').map(i => parseInt(i));
        isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentPuzzle.correctOrder);
        break;
        
      case 'map':
      case 'facts':
        isCorrect = parseInt(userAnswer) === currentPuzzle.correct;
        break;
        
      case 'planning':
        const userBlanks = userAnswer.toLowerCase().split(',').map(s => s.trim());
        const correctBlanks = currentPuzzle.blanks.map(s => s.toLowerCase());
        isCorrect = JSON.stringify(userBlanks) === JSON.stringify(correctBlanks);
        break;
    }
    
    if (isCorrect) {
      onComplete(currentPuzzle.points);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
      if (attempts >= 2) {
        // Dar pontos parciais após 3 tentativas
        onComplete(Math.floor(currentPuzzle.points / 2));
      }
    }
  };
  
  const renderPuzzleContent = () => {
    if (!currentPuzzle) return null;
    
    switch (currentPuzzle.type) {
      case 'timeline':
        return (
          <div>
            <p className="mb-4">{currentPuzzle.question}</p>
            <div className="space-y-2 mb-4">
              {currentPuzzle.events.map((event, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded">
                  {index + 1}. {event}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Digite a ordem (ex: 0,1,2,3)"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );
        
      case 'map':
      case 'facts':
        return (
          <div>
            <p className="mb-4">{currentPuzzle.question}</p>
            <div className="space-y-2 mb-4">
              {currentPuzzle.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="puzzle-option"
                    value={index}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
        
      case 'planning':
        return (
          <div>
            <p className="mb-4">{currentPuzzle.question}</p>
            <input
              type="text"
              placeholder="Digite as respostas separadas por vírgula"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (!currentPuzzle) {
    return (
      <div className="puzzle-overlay">
        <div className="puzzle-box">
          <h3>Nenhum puzzle disponível para esta época</h3>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="puzzle-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
    >
      <div 
        className="puzzle-box"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '600px',
          width: '90%',
          color: 'white',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>
          🧩 {currentPuzzle.title}
        </h3>
        
        <div 
          style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          {renderPuzzleContent()}
        </div>
        
        {showHint && (
          <div 
            style={{
              background: 'rgba(255,255,0,0.2)',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '20px',
              border: '2px solid rgba(255,255,0,0.5)',
            }}
          >
            <strong>💡 Dica:</strong> {currentPuzzle.hint}
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <small>Tentativas: {attempts}/3</small>
            <br />
            <small>Pontos: {currentPuzzle.points}</small>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Fechar
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              style={{
                background: userAnswer ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'white',
                cursor: userAnswer ? 'pointer' : 'not-allowed',
              }}
            >
              Enviar Resposta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

