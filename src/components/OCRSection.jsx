import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

function OCRSection({ onAnalysisComplete, setSelectedFile, existingRecord }){
  // 초기값으로 기존 기록의 이미지가 있다면 그것을 사용합니다.
  const [image, setImage] = useState(existingRecord?.imageUrl || null);
  const [loading, setLoading] = useState(false);

  // 💡 기존 기록이 바뀔 때(페이지 진입 시) 이미지 상태 업데이트
  useEffect(() => {
    if (existingRecord) {
      setImage(existingRecord.imageUrl || null);
    } else {
      setImage(null);
    }
  }, [existingRecord]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file); 
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    runOCR(imageUrl);
  };

  const runOCR = async (imageUrl) => {
    setLoading(true);
    try {
      const result = await Tesseract.recognize(imageUrl, 'kor+chi_sim');
      const match = result.data.text.match(/이미\s*(\d+)경험치/);
      
      if (match) {
        onAnalysisComplete(parseInt(match[1]));
      } else {
        alert("경험치를 찾을 수 없습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("OCR 에러:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '15px', marginBottom: '20px', textAlign: 'center' }}>
      <h3>📸 오늘 공부 스크린샷</h3>
      
      {/* 이미지 미리보기 영역 */}
      {image && (
        <div style={{ marginBottom: '15px' }}>
          <img src={image} alt="미리보기" style={{ maxWidth: '100%', borderRadius: '10px', maxHeight: '200px' }} />
        </div>
      )}

      <input type="file" onChange={handleFileChange} accept="image/*" id="file-upload" style={{ display: 'none' }} />
      <label htmlFor="file-upload" style={{ 
        display: 'inline-block', padding: '10px 20px', backgroundColor: '#007AFF', color: 'white', 
        borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
      }}>
        {loading ? "점수 분석 중..." : "사진 선택하기"}
      </label>
      
      {loading && <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>Tesseract가 글자를 읽고 있습니다...</p>}
    </div>
  );
}

export default OCRSection;