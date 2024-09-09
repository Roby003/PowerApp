import React from "react";

function BarbellSvg({ className }) {
  return (
    <svg width="65" height="35" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g fill="none" fill-rule="evenodd" stroke="#1D83EA" stroke-width="3.5">
        <path d="M47.45 16.7v1.1h-29.5v-1.1h29.5z"></path>
        <rect x="48.25" y="1.75" width="8" height="31" rx="2"></rect>
        <rect x="8.25" y="1.75" width="8" height="31" rx="2"></rect>
        <rect x="56.25" y="8.25" width="6.5" height="17.5" rx="2"></rect>
        <rect transform="matrix(-1 0 0 1 10 0)" x="1.75" y="8.25" width="6.5" height="17.5" rx="2"></rect>
        <path d="M56.575 6.9v19.716"></path>
      </g>
    </svg>
  );
}

export default BarbellSvg;
