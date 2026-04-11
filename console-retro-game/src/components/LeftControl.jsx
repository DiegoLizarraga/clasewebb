import React from "react";

function LeftControl({ handleDirection }) {
  const buttonStyle = { cursor: "pointer" };

  return (
    <svg viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg" width="160" height="260">
      
      <defs>
        <radialGradient id="stickGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d1d1d1" />
          <stop offset="100%" stopColor="#888888" />
        </radialGradient>
      </defs>

      <rect x="0" y="30" width="160" height="200" rx="30" fill="#E8E020" />

      {/* Analog stick con efecto de profundidad */}
      <circle cx="80" cy="90" r="28" fill="#333" opacity="0.2" /> {/* Sombra */}
      <circle cx="80" cy="90" r="26" fill="url(#stickGrad)" />
      <circle cx="80" cy="90" r="18" fill="none" stroke="#666" strokeWidth="1" />

      
     

     
      <path 
        d="M52 148h22v15h15v22h-15v15h-22v-15h-15v-22h15z" 
        fill="#1a1a1a" 
      />

      <path 
        d="M52 148h22v26h-22z" fill="transparent" style={buttonStyle}
        onClick={() => handleDirection('up')} 
      />
      {/* Abajo */}
      <path 
        d="M52 174h22v26h-22z" fill="transparent" style={buttonStyle}
        onClick={() => handleDirection('down')} 
      />
      {/* Izquierda */}
      <path 
        d="M37 163h26v22h-26z" fill="transparent" style={buttonStyle}
        onClick={() => handleDirection('left')} 
      />
      {/* Derecha */}
      <path 
        d="M63 163h26v22h-26z" fill="transparent" style={buttonStyle}
        onClick={() => handleDirection('right')} 
      />
    </svg>
  );
}

export default LeftControl;