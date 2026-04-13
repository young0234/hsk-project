import React from 'react';
import { motion } from 'framer-motion';

const WatercolorMountain = () => {
  // 피그마에서 가져오신 산의 경로 데이터
  const pathData = "M701.976 181.141L-70.4473 456.372L-72.7438 518.332L-58.7185 517.856C-44.1186 521.239 -12.9284 527.939 -4.96668 527.669C4.98544 527.331 69.0004 513.518 228.787 508.091C388.574 502.663 256.536 489.437 273.676 488.855C290.816 488.273 307.787 492.251 394.207 484.761C480.628 477.272 518.504 498.25 606.968 495.246C695.431 492.241 628.652 504.148 690.007 504.064L783.463 500.89C783.463 500.89 913.871 498.485 1005.05 481.725C1096.23 464.965 1200.96 475.071 1268.23 472.786C1335.5 470.501 1471.52 520.195 1506.98 512.244C1542.43 504.293 1616.32 488.289 1628.26 487.883L1768.14 483.132C1809.79 481.717 2043.52 531.972 2043.52 531.972L2054.08 247.049L1746.94 324.783L1575.56 225.856L1406.27 249.317L1034.07 100.535L733.489 209.926L701.976 181.141Z";

  return (
    <div style={{ width: '100%', overflow: 'hidden', background: '#f8f9fa' }}>
      <svg
        viewBox="0 0 2034 633"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto' }}
      >
        <defs>
          {/* 수채화 느낌을 더해주는 커스텀 필터 */}
          <filter id="watercolor-bleed" x="-20%" y="-20%" width="140%" height="140%">
            {/* 1. 선의 경계를 자글자글하게 만듦 (잉크 번짐) */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
            {/* 2. 부드러운 블러 효과 (피그마에서 가져온 느낌 유지) */}
            <feGaussianBlur stdDeviation="15" result="softBlur" />
            <feComposite in="SourceGraphic" in2="softBlur" operator="atop" />
          </filter>
        </defs>

        <g filter="url(#watercolor-bleed)">
          <motion.path
            d={pathData}
            stroke="#B9B8B8" // 선 색상
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#F0F5F8" // 채우기 색상
            
            // 애니메이션 핵심 설정
            initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 0 }}
            whileInView={{ 
              pathLength: 1, 
              strokeOpacity: 1,
              fillOpacity: 0.7 // 약간 투명해야 겹쳤을 때 예뻐요
            }}
            viewport={{ once: true }} // 화면에 보일 때 딱 한 번만 실행
            transition={{
              pathLength: { duration: 3, ease: "easeInOut" },
              strokeOpacity: { duration: 1 },
              fillOpacity: { duration: 2.5, delay: 2 } // 선이 절반 이상 그려지면 번지기 시작
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export default WatercolorMountain;