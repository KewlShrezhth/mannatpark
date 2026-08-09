import React from 'react';

export default function Logo({ variant = "dark", className = "", showTagline = true }) {
  const isDarkBg = variant === "light";

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      {/* Recreated Exact Leaf Emblem */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-10 h-10 flex-shrink-0"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-Left Outer Leaf */}
        <path 
          d="M 50 50 C 30 20, 15 25, 10 50 C 20 60, 45 55, 50 50 Z" 
          fill="#78c044" 
        />
        {/* Top Outer Leaf */}
        <path 
          d="M 50 50 C 35 15, 45 5, 60 5 C 75 15, 60 40, 50 50 Z" 
          fill="#78c044" 
        />
        {/* Right Outer Leaf */}
        <path 
          d="M 50 50 C 70 30, 85 30, 90 45 C 80 65, 60 55, 50 50 Z" 
          fill="#78c044" 
        />
        {/* Bottom Right Outer Leaf */}
        <path 
          d="M 50 50 C 75 60, 85 75, 80 90 C 65 90, 55 70, 50 50 Z" 
          fill="#78c044" 
        />
        {/* Inner Dark Green Curve 1 */}
        <path 
          d="M 50 50 C 35 35, 25 45, 25 55 C 35 55, 45 52, 50 50 Z" 
          fill="#185226" 
        />
        {/* Inner Dark Green Curve 2 */}
        <path 
          d="M 50 50 C 45 65, 35 75, 30 75 C 35 60, 45 55, 50 50 Z" 
          fill="#185226" 
        />
      </svg>

      {/* Typography Stack */}
      <div className="flex flex-col text-left justify-center leading-none">
        <span className={`text-[9px] font-black tracking-[0.22em] uppercase font-sans ${isDarkBg ? 'text-emerald-200' : 'text-stone-700'}`}>
          THE
        </span>
        <span className="text-[21px] font-black tracking-[0.02em] text-[#185226] font-sans leading-none -mt-0.5">
          MANNAT
        </span>
        <span className={`text-[17px] font-black tracking-wide font-sans leading-none -mt-0.5 ${isDarkBg ? 'text-white' : 'text-stone-900'}`}>
          PARK
        </span>
        {showTagline && (
          <span className={`text-[8.5px] font-bold tracking-tight font-sans mt-0.5 ${isDarkBg ? 'text-emerald-300/80' : 'text-stone-600'}`}>
            Signature Plots By MAK Infra
          </span>
        )}
      </div>
    </div>
  );
}
