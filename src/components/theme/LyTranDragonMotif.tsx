import React from 'react';

interface LyTranDragonMotifProps {
  type?: 'ly' | 'tran';
  size?: number;
  className?: string;
  color?: string;
  opacity?: number;
}

/**
 * Hoa văn Rồng thời Lý - Trần: Biểu tượng vương quyền và nghệ thuật đỉnh cao thời Đại Việt
 * - Rồng Lý: Uốn lượn hình sin mềm mại, ngậm ngọc minh châu, vảy hoa cúc thanh tao.
 * - Rồng Trần: Thân hình uy dũng, mào đao lửa khỏe khoắn, thể hiện Hào khí Đông A.
 */
export const LyTranDragonMotif: React.FC<LyTranDragonMotifProps> = ({
  type = 'ly',
  size = 64,
  className = '',
  color = 'currentColor',
  opacity = 1,
}) => {
  if (type === 'ly') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ opacity }}
      >
        {/* Rồng thời Lý uốn khúc hình sin thanh thoát mềm mại */}
        <g stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Viên ngọc minh châu trước miệng rồng */}
          <circle cx="22" cy="38" r="6" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.25" />
          <path d="M 18 38 C 18 34, 26 34, 26 38" />
          <circle cx="22" cy="38" r="2" fill={color} />

          {/* Đầu rồng thời Lý: Miệng mở rộng ngậm ngọc, mào đao lửa uốn lượn */}
          <path
            d="M 28 36 C 32 30, 38 26, 46 28 C 42 34, 38 38, 32 40"
            fill={color}
            fillOpacity="0.2"
          />
          {/* Hàm dưới */}
          <path d="M 28 42 C 34 44, 40 44, 46 40" />
          {/* Mắt rồng */}
          <circle cx="40" cy="32" r="2" fill={color} />
          {/* Mũi và bờm rồng Lý uốn lượn như búp sen / lá bồ đề */}
          <path d="M 36 28 C 34 20, 42 16, 48 18 C 44 24, 42 26, 46 28" />
          <path d="M 44 22 C 50 14, 60 16, 56 24" />
          <path d="M 46 28 C 54 22, 64 24, 60 32" />

          {/* Thân rồng uốn khúc hình sin trứ danh 12 khúc */}
          {/* Khúc 1 */}
          <path
            d="M 46 40 C 58 46, 72 44, 82 34 C 92 24, 102 26, 106 36 C 110 48, 98 62, 84 66 C 70 70, 56 64, 46 74 C 36 84, 40 98, 54 104 C 68 110, 84 102, 94 92 C 102 84, 110 88, 114 96"
            strokeWidth="3.2"
          />
          {/* Lưng rồng có vây hình răng cưa hoa cúc */}
          <path d="M 76 38 L 78 34 L 82 36" />
          <path d="M 88 28 L 92 24 L 94 28" />
          <path d="M 102 30 L 106 28 L 106 34" />
          <path d="M 98 54 L 102 56 L 96 60" />
          <path d="M 78 68 L 76 72 L 72 68" />
          <path d="M 50 72 L 46 76 L 48 80" />
          <path d="M 42 90 L 38 94 L 44 96" />
          <path d="M 64 108 L 68 112 L 72 108" />

          {/* Móng rồng Lý: 3 móng mảnh mai như móng chim phượng */}
          {/* Chân trước */}
          <path d="M 58 46 C 54 54, 48 58, 42 56" />
          <path d="M 42 56 L 38 58" />
          <path d="M 42 56 L 38 54" />
          <path d="M 42 56 L 42 62" />

          {/* Chân sau */}
          <path d="M 74 68 C 70 76, 64 80, 58 78" />
          <path d="M 58 78 L 54 80" />
          <path d="M 58 78 L 54 76" />

          {/* Đuôi rồng thon nhỏ vuốt nhọn uốn cong */}
          <path d="M 114 96 C 116 100, 114 104, 108 106 C 102 108, 98 104, 102 100" />
        </g>
      </svg>
    );
  }

  // Rồng thời Trần: Thân tròn dũng mãnh, mào đao lửa, thể hiện Hào khí Đông A
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Đầu rồng thời Trần: Đầu lớn, sừng rồng nhô cao uy vệ, mồm há rộng, răng sắc nhọn */}
        <path
          d="M 24 38 C 30 32, 38 28, 48 30 C 44 38, 38 42, 30 44"
          fill={color}
          fillOpacity="0.25"
        />
        {/* Hàm dưới khỏe khoắn */}
        <path d="M 28 46 C 36 48, 44 48, 48 44" />
        {/* Răng nanh */}
        <path d="M 32 38 L 34 42 L 36 38" />
        <path d="M 38 38 L 40 42 L 42 38" />
        
        {/* Sừng rồng thời Trần & Đao lửa gãy khúc mạnh mẽ */}
        <path d="M 42 28 C 44 18, 52 14, 58 16 C 54 22, 50 26, 48 30" fill={color} fillOpacity="0.2" />
        <path d="M 50 18 C 58 10, 68 12, 64 22" />
        <path d="M 48 30 C 58 24, 70 26, 68 36" />
        <circle cx="42" cy="34" r="2.5" fill={color} />

        {/* Thân rồng thời Trần uốn lượn khúc chiết, dày dặn */}
        <path
          d="M 48 44 C 62 50, 76 46, 86 36 C 96 26, 108 30, 110 42 C 112 56, 96 68, 80 70 C 64 72, 52 68, 44 80 C 34 92, 42 106, 58 110 C 74 114, 92 104, 102 92 C 110 82, 116 88, 116 98"
          strokeWidth="3.8"
        />

        {/* Vây lưng hình đao lửa nhọn hoắt thời Trần */}
        <path d="M 80 40 L 84 32 L 88 38" />
        <path d="M 94 30 L 100 22 L 102 30" />
        <path d="M 106 34 L 114 30 L 112 38" />
        <path d="M 96 62 L 102 66 L 94 68" />
        <path d="M 72 72 L 70 80 L 66 74" />
        <path d="M 48 76 L 42 82 L 46 86" />
        <path d="M 42 98 L 36 104 L 44 104" />
        <path d="M 70 114 L 76 120 L 80 112" />

        {/* Vuốt rồng Trần: 4 móng to khỏe, bám chắc */}
        {/* Chân trước */}
        <path d="M 60 50 L 52 62 L 44 60" strokeWidth="2.8" />
        <path d="M 44 60 L 38 62" />
        <path d="M 44 60 L 38 56" />
        <path d="M 44 60 L 42 66" />

        {/* Chân sau */}
        <path d="M 76 72 L 68 84 L 60 82" strokeWidth="2.8" />
        <path d="M 60 82 L 54 84" />
        <path d="M 60 82 L 54 78" />

        {/* Đuôi xoắn đao lửa */}
        <path d="M 116 98 C 118 104, 112 110, 104 110 C 98 110, 94 104, 100 98" />
      </g>
    </svg>
  );
};
