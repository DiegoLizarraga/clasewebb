import React from "react";

function RightControl({ handleSelection }) {
  const btnStyle = { cursor: "pointer" };

  return (
    <svg viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg" width="160" height="260">
      {/* Body */}
      <rect x="10" y="30" width="160" height="200" rx="30" fill="#E8E020" />

      {/* Analog stick */}
      <circle cx="90" cy="180" r="26" fill="#CCCCCC" />
      <circle cx="90" cy="180" r="18" fill="#AAAAAA" />

      {/* X button */}
      <g style={btnStyle} onClick={() => handleSelection('X')}>
        <circle cx="100" cy="76" r="13" fill="#CCCCCC" />
        <text x="100" y="81" textAnchor="middle" fontSize="11" fill="#2255CC" fontFamily="sans-serif" fontWeight="700">X</text>
      </g>

      {/* A button */}
      <g style={btnStyle} onClick={() => handleSelection('A')}>
        <circle cx="126" cy="100" r="13" fill="#CCCCCC" />
        <text x="126" y="105" textAnchor="middle" fontSize="11" fill="#CC2222" fontFamily="sans-serif" fontWeight="700">A</text>
      </g>

      {/* B button */}
      <g style={btnStyle} onClick={() => handleSelection('B')}>
        <circle cx="100" cy="124" r="13" fill="#CCCCCC" />
        <text x="100" y="129" textAnchor="middle" fontSize="11" fill="#DDAA00" fontFamily="sans-serif" fontWeight="700">B</text>
      </g>

      {/* Y button */}
      <g style={btnStyle} onClick={() => handleSelection('Y')}>
        <circle cx="74" cy="100" r="13" fill="#CCCCCC" />
        <text x="74" y="105" textAnchor="middle" fontSize="11" fill="#228833" fontFamily="sans-serif" fontWeight="700">Y</text>
      </g>
    </svg>
  );
}

export default RightControl;