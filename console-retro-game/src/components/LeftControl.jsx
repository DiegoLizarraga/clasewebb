import React from "react";

function LeftControl() {
  return (
    <svg viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg" width="160" height="260">
      {/* Body */}
      <rect x="0" y="30" width="160" height="200" rx="30" fill="#E8E020" />

      {/* Analog stick */}
      <circle cx="80" cy="90" r="26" fill="#CCCCCC" />
      <circle cx="80" cy="90" r="18" fill="#AAAAAA" />

      {/* D-Pad vertical */}
      <rect x="52" y="148" width="22" height="60" rx="4" fill="#CCCCCC" />
      {/* D-Pad horizontal */}
      <rect x="37" y="163" width="52" height="22" rx="4" fill="#141414" />
      {/* D-Pad center */}
      <rect x="52" y="163" width="22" height="22" rx="2" fill="#BBBBBB" />

      
    </svg>
  );


    
}

export default LeftControl;


