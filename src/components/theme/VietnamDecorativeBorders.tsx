import React from 'react';

interface VietnamPatternBorderProps {
  className?: string;
  color?: string;
  patternType?: 'dong-son' | 'ly-lotus' | 'tran-cloud';
  height?: number;
}

/**
 * Diềm họa tiết hoa văn cổ truyền Việt Nam
 * Dùng làm đường phân cách, viền khung Bento hoặc header bar
 */
export const VietnamDecorativeBorder: React.FC<VietnamPatternBorderProps> = ({
  className = '',
  color = '#F37021',
  patternType = 'dong-son',
  height = 14,
}) => {
  if (patternType === 'ly-lotus') {
    // Hoa văn Cúc dây / Hoa sen thời Lý
    return (
      <div className={`w-full overflow-hidden flex items-center ${className}`} style={{ height }}>
        <svg
          width="100%"
          height={height}
          viewBox="0 0 400 16"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern id="ly-lotus-pattern" width="40" height="16" patternUnits="userSpaceOnUse">
            {/* Hoa sen / Cúc dây uốn lượn */}
            <path
              d="M 0 8 C 10 2, 15 2, 20 8 C 25 14, 30 14, 40 8"
              stroke={color}
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 0 8 C 10 14, 15 14, 20 8 C 25 2, 30 2, 40 8"
              stroke={color}
              strokeWidth="1.2"
              fill="none"
            />
            {/* Nụ hoa cúc ở giữa */}
            <circle cx="20" cy="8" r="2.5" fill={color} fillOpacity="0.7" />
            <circle cx="20" cy="8" r="4" stroke={color} strokeWidth="0.8" fill="none" />
            <circle cx="0" cy="8" r="1.5" fill={color} />
            <circle cx="40" cy="8" r="1.5" fill={color} />
          </pattern>
          <rect width="100%" height="16" fill="url(#ly-lotus-pattern)" />
        </svg>
      </div>
    );
  }

  if (patternType === 'tran-cloud') {
    // Hoa văn Vân Mây & Sóng Nước thời Trần
    return (
      <div className={`w-full overflow-hidden flex items-center ${className}`} style={{ height }}>
        <svg
          width="100%"
          height={height}
          viewBox="0 0 400 16"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern id="tran-cloud-pattern" width="32" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M 0 12 C 6 6, 12 6, 16 12 C 20 6, 26 6, 32 12"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 8 7 C 12 3, 16 3, 20 7"
              stroke={color}
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="16" cy="4" r="1.2" fill={color} />
          </pattern>
          <rect width="100%" height="16" fill="url(#tran-cloud-pattern)" />
        </svg>
      </div>
    );
  }

  // Default: Trống đồng Đông Sơn (Răng cưa & Vòng tròn đồng tâm có chấm giữa)
  return (
    <div className={`w-full overflow-hidden flex items-center ${className}`} style={{ height }}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 400 14"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="dong-son-border-pattern" width="28" height="14" patternUnits="userSpaceOnUse">
          {/* Đường diềm thẳng */}
          <line x1="0" y1="2" x2="28" y2="2" stroke={color} strokeWidth="1" />
          <line x1="0" y1="12" x2="28" y2="12" stroke={color} strokeWidth="1" />
          {/* Họa tiết răng cưa */}
          <path d="M 0 2 L 4 7 L 8 2 L 12 7 L 16 2 L 20 7 L 24 2 L 28 7" stroke={color} strokeWidth="0.9" fill="none" />
          <path d="M 0 12 L 4 7 L 8 12 L 12 7 L 16 12 L 20 7 L 24 12 L 28 7" stroke={color} strokeWidth="0.9" fill="none" />
          {/* Chấm tròn giữa răng cưa */}
          <circle cx="14" cy="7" r="1.5" fill={color} />
          <circle cx="0" cy="7" r="1.5" fill={color} />
          <circle cx="28" cy="7" r="1.5" fill={color} />
        </pattern>
        <rect width="100%" height="14" fill="url(#dong-son-border-pattern)" />
      </svg>
    </div>
  );
};
