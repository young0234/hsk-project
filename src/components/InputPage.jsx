// src/components/InputPage.jsx
import React from 'react';
import OCRSection from './OCRSection';
import DiaryInput from './DiaryInput';

function InputPage({ currentXP, setCurrentXP, onSave, onBack, existingRecord, setSelectedFile }) { 
  return (
    <div className="input-page">
      <button onClick={onBack} className="back-button">← 뒤로가기</button>
      <h2 style={{ textAlign: 'center' }}>
        {existingRecord ? "오늘의 기록 수정" : "오늘의 학습 등록"}
      </h2>
      
      <OCRSection 
        onAnalysisComplete={setCurrentXP}
        setSelectedFile={setSelectedFile} 
        existingRecord={existingRecord}
      />
      
      <DiaryInput 
        onSave={onSave} 
        currentXP={currentXP} 
        defaultMemo={existingRecord ? existingRecord.memo : ""} 
        isUpdate={!!existingRecord}
      />
    </div>
  );
}

export default InputPage; // 이 부분이 누락되지 않게 주의하세요!