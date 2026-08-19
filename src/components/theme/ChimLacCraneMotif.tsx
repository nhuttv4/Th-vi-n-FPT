import React from 'react';

interface ChimLacCraneMotifProps {
  size?: number;
  className?: string;
  color?: string;
  opacity?: number;
  direction?: 'left' | 'right';
}

/**
 * Chim Lạc / Chim Hạc Motif - Biểu tượng văn hóa thời Hùng Vương & Trống đồng Đông Sơn
 * Chim sải cánh dài, mỏ dài bay lượn kiêu hãnh trên nền trời Đại Việt
 */
export const ChimLacCraneMotif: React.FC<ChimLacCraneMotifProps> = ({
  size = 64,
  className = '',
  color = 'currentColor',
  opacity = 1,
  direction = 'right',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        opacity,
        transform: direction === 'left' ? 'scaleX(-1)' : 'none',
      }}
    >
      {/* Chim Lạc Đông Sơn: Đầu mỏ dài vươn cao, cánh sải dài có lông vũ cách điệu hình học */}
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Mỏ và đầu chim */}
        <path d="M 88 28 L 70 34 L 62 38 L 56 42" />
        <path d="M 88 28 L 74 31 L 64 36" fill={color} fillOpacity="0.2" />
        {/* Mắt chim */}
        <circle cx="68" cy="33" r="1.5" fill={color} />
        {/* Mào chim dài uốn lượn */}
        <path d="M 64 33 C 58 24, 46 22, 38 24 C 44 28, 52 30, 58 36" fill={color} fillOpacity="0.15" />
        
        {/* Cổ chim thuôn dài */}
        <path d="M 56 42 C 50 48, 44 54, 38 58" />
        <path d="M 62 38 C 56 46, 50 54, 44 60" />

        {/* Thân mình chim Lạc */}
        <path
          d="M 38 58 C 30 62, 22 66, 14 70 C 18 64, 26 58, 36 54 C 44 50, 48 56, 38 58 Z"
          fill={color}
          fillOpacity="0.25"
        />

        {/* Cánh chim sải rộng bay vút lên */}
        <path
          d="M 44 50 C 48 38, 56 22, 72 12 C 64 22, 58 34, 52 46"
          fill={color}
          fillOpacity="0.2"
        />
        {/* Lông vũ cách điệu trên cánh */}
        <path d="M 52 28 C 46 22, 38 18, 30 16" />
        <path d="M 56 34 C 48 28, 42 24, 34 22" />
        <path d="M 60 40 C 52 36, 46 32, 38 30" />

        {/* Đuôi chim xòe dài thanh thoát */}
        <path d="M 18 68 C 10 74, 4 82, 2 90 C 8 84, 16 78, 22 72" />
        <path d="M 14 70 C 8 78, 4 86, 2 92" />
        <path d="M 22 66 C 16 74, 12 82, 8 88" />

        {/* Chân chim duỗi thẳng bay về phía sau */}
        <path d="M 32 64 L 20 80 L 16 84" />
        <path d="M 28 66 L 18 82 L 14 86" />

        {/* Hoa văn chấm tròn răng cưa Đông Sơn nhỏ quanh thân */}
        <circle cx="48" cy="52" r="1" fill={color} />
        <circle cx="42" cy="56" r="1" fill={color} />
        <circle cx="36" cy="60" r="1" fill={color} />
      </g>
    </svg>
  );
};
