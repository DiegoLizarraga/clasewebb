import React, { useState, useEffect } from 'react';

const GameScreen = ({ player, computer }) => {
  // --- ESTADOS DE VIDA ---
  const [playerHP, setPlayerHP] = useState(100);
  const [computerHP, setComputerHP] = useState(100);
  
  // --- ESTADOS DE JUEGO ---
  const [selectedMoves, setSelectedMoves] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('player'); 
  const [isGameOver, setIsGameOver] = useState(false);
  const [battleLog, setBattleLog] = useState(`¡Un ${computer?.name} salvaje apareció!`);

  useEffect(() => {
    if (player?.moves) {
      setSelectedMoves(player.moves.slice(0, 4));
    }
  }, [player]);

  // --- SISTEMA DE DAÑO AJUSTADO
  const calculateDamage = (baseAttack) => {
    // Como tus ataques son de ~300 y la vida es 100, 
    // dividimos el ataque entre 10 y luego aplicamos el azar.
    // Así un ataque de 300 hará entre 15 y 30 de daño.
    const baseReduced = (baseAttack || 100) / 10;
    const randomFactor = Math.random() * (1.2 - 0.8) + 0.8;
    return Math.floor(baseReduced * randomFactor) || 5;
  };

  const handlePlayerAttack = (move) => {
    if (isGameOver || currentTurn !== 'player') return;

    const damage = calculateDamage(move.attack);
    const newComputerHP = Math.max(0, computerHP - damage);
    
    setComputerHP(newComputerHP);
    setBattleLog(`${player?.name} usó ${move.move.name.replace(/-/g, ' ')} e hizo ${damage} de daño!`);

    if (newComputerHP <= 0) {
      setTimeout(() => setIsGameOver(true), 500);
      return;
    }

    setCurrentTurn('computer');
    setTimeout(() => computerTurnLogic(), 1200);
  };

  const computerTurnLogic = () => {
    if (isGameOver) return;

    // Daño de la computadora basado en un ataque promedio de 200
    const damage = calculateDamage(200);
    const newPlayerHP = Math.max(0, playerHP - damage);

    setPlayerHP(newPlayerHP);
    setBattleLog(`¡${computer?.name} usó un ataque e hizo ${damage} de daño!`);

    if (newPlayerHP <= 0) {
      setTimeout(() => setIsGameOver(true), 500);
      return;
    }

    setCurrentTurn('player');
  };

  
  return (
    <div 
      className="w-[450px] h-[300px] flex flex-col border-4 border-black relative overflow-hidden shadow-2xl"
      style={{ 
        backgroundImage: `url('https://www.quadratin.com.mx/www/wp-content/uploads/2024/09/deslavecerrocumbresdellanolargo-1160x700-1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* AREA DE COMBATE: Conservando tu diseño de grid y cuadros blancos */}
      <div className="grid grid-cols-2 w-full pt-4 px-4 h-[160px]">
        
        {/* Jugador */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-white border-2 border-black px-4 py-1 shadow-sm">
            <p className="text-sm font-bold font-mono">HP: {playerHP}/100</p>
          </div>
          <img 
            className="w-20 h-20 object-contain drop-shadow-md" 
            src={player?.sprites?.front_default} 
            alt={player?.name} 
          />
          <p className="capitalize font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-sm bg-black/20 px-2 rounded">
            {player?.name}
          </p>
        </div>

        {/* Computadora */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-white border-2 border-black px-4 py-1 shadow-sm">
            <p className="text-sm font-bold font-mono">HP: {computerHP}/100</p>
          </div>
          <img 
            className="w-20 h-20 object-contain drop-shadow-md" 
            src={computer?.sprites?.front_default} 
            alt={computer?.name} 
          />
          <p className="capitalize font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-sm bg-black/20 px-2 rounded">
            {computer?.name}
          </p>
        </div>
      </div>

     

      {/* PANEL DE ATAQUES: Estilo Blanco y Negro */}
      <div className="absolute bottom-0 right-0 p-3 bg-zinc-800/60 border-t-2 border-l-2 border-zinc-400 rounded-tl-lg backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-2">
          {selectedMoves.map((m, i) => (
            <button 
              key={i}
              className={`bg-white border-2 border-black px-2 py-1 w-[110px] shadow-sm flex flex-col items-center transition-all ${
                currentTurn === 'player' ? 'hover:bg-gray-200 active:scale-95' : 'opacity-50 grayscale'
              }`}
              onClick={() => handlePlayerAttack(m)}
              disabled={currentTurn !== 'player'}
            >
              <p className="text-[10px] font-bold uppercase truncate w-full text-center">
                {m?.move?.name?.replace(/-/g, ' ')}
              </p>
              <p className="text-[8px] text-red-600 font-bold">ATK: {m?.attack || 0}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;