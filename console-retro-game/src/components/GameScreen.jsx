import React, { useState, useEffect } from 'react';

const GameScreen = ({ player, computer }) => {
  const [playerHP, setPlayerHP] = useState(100);
  const [computerHP, setComputerHP] = useState(100);
  const [playerMoves, setPlayerMoves] = useState([]);

  // Selección aleatoria de 4 movimientos al cargar el componente
  useEffect(() => {
    if (player?.moves) {
      const shuffled = [...player.moves].sort(() => 0.5 - Math.random());
      setPlayerMoves(shuffled.slice(0, 4));
    }
  }, [player]);

  return (
    <div 
      className="w-[450px] h-[250px] flex flex-col border-4 relative"
      style={{ 
        backgroundImage: `url('https://www.quadratin.com.mx/www/wp-content/uploads/2024/09/deslavecerrocumbresdellanolargo-1160x700-1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Área de Combate */}
      <div className="flex w-full justify-around items-center px-10 flex-grow">
        {/* Contenedor Jugador */}
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white/80 px-2 py-1 rounded mb-2 border border-black shadow-sm">
            <p className="text-sm font-bold font-mono">HP: {playerHP}/100</p>
          </div>
          <img 
            className="w-24 h-24 object-contain" 
            src={player?.sprites?.front_default} 
            alt={player?.name} 
          />
          <p className="capitalize font-bold text-white drop-shadow-md">{player?.name}</p>
        </div>

        {/* Contenedor Enemigo */}
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white/80 px-2 py-1 rounded mb-2 border border-black shadow-sm">
            <p className="text-sm font-bold font-mono">HP: {computerHP}/100</p>
          </div>
          <img 
            className="w-24 h-24 object-contain" 
            src={computer?.sprites?.front_default} 
            alt={computer?.name} 
          />
          <p className="capitalize font-bold text-white drop-shadow-md">{computer?.name}</p>
        </div>
      </div>

      {/* Sección Inferior de Ataques */}
      <div className="absolute bottom-0 right-0 p-2 bg-black/40 rounded-tl-lg border-l-2 border-t-2 border-white/50">
        <div className="grid grid-cols-2 gap-1">
          {playerMoves.map((moveItem, index) => (
            <button 
              key={index}
              className="bg-slate-100 hover:bg-yellow-400 text-[10px] font-bold py-1 px-3 rounded uppercase border border-gray-600 transition-colors w-24 overflow-hidden text-ellipsis whitespace-nowrap"
              onClick={() => console.log(`Usaste ${moveItem.move.name}`)}
            >
              {moveItem.move.name.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;