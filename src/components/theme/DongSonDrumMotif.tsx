import React from 'react';

interface DongSonDrumMotifProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}

export const DongSonDrumMotif: React.FC<DongSonDrumMotifProps> = ({
  className = '',
  size = 120,
  opacity = 0.15,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none transition-opacity duration-300 ${className}`}
      style={{ opacity }}
    >
      {/* Outer concentric rings */}
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="82" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="54" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="100" cy="100" r="42" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="28" stroke={color} strokeWidth="1" />

      {/* Central 14-ray Sun (Mặt trời 14 tia đặc trưng Trống đồng Đông Sơn) */}
      <circle cx="100" cy="100" r="10" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
      {[...Array(14)].map((_, i) => {
        const angle = (i * 360) / 14;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 10;
        const y1 = 100 + Math.sin(rad) * 10;
        const x2 = 100 + Math.cos(rad) * 28;
        const y2 = 100 + Math.sin(rad) * 28;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.8" strokeLinecap="round" />;
      })}

      {/* Flying Lac Bird silhouettes (Họa tiết Chim Lạc bay ngược chiều kim đồng hồ) */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6 + 15;
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 62;
        const cy = 100 + Math.sin(rad) * 62;
        return (
          <g key={`bird-${i}`} transform={`translate(${cx}, ${cy}) rotate(${angle + 90}) scale(0.6)`}>
            <path
              d="M-8,0 C-4,-4 4,-4 8,0 C4,2 -4,2 -8,0 Z M-3,-2 L-10,-8 L-6,-3 Z M3,-2 L10,-8 L6,-3 Z"
              fill={color}
            />
          </g>
        );
      })}

      {/* Geometric Sawtooth pattern (Hoa văn răng cưa / hình tam giác) */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 76;
        const y = 100 + Math.sin(rad) * 76;
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="1"
            fill={color}
          />
        );
      })}
    </svg>
  );
};
