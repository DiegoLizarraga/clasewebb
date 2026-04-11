import React from 'react';

const GameScreen = ({ player, computer }) => {
  return (
    <div 
      className="w-[450px] h-[200px] flex justify-center items-center border-4"
      style={{ 
        backgroundImage: `url('https://www.quadratin.com.mx/www/wp-content/uploads/2024/09/deslavecerrocumbresdellanolargo-1160x700-1.jpg')`, // Adjust path as needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex w-full justify-around items-center px-10">
        <div className="flex justify-center items-center">
          <img src={player?.sprites?.front_default} alt={player?.name} />
        </div>
        <div className="flex justify-center items-center">
          <img src={computer?.sprites?.front_default} alt={computer?.name} />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;   