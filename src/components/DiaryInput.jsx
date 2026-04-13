import React, { useState, useEffect } from 'react';

function DiaryInput({ onSave, currentXP, defaultMemo, isUpdate }) {
  const [memo, setMemo] = useState("");

  // 💡 컴포넌트가 열릴 때 기존 메모가 있다면 입력창에 채워줌
  useEffect(() => {
    setMemo(defaultMemo);
  }, [defaultMemo]);

  const handleSave = () => {
    if (currentXP === 0) return alert("분석을 먼저 해주세요!");
    onSave(memo); // App.jsx의 handleSaveDiary 실행
    setMemo("");
  };

  const getEncouragement = (xp) => {
    if (xp === 0) return "분석을 먼저 해주세요!";
    if (xp < 50) return `현재 ${xp} XP네요. '좀 더 해볼까요?' 조금만 더 힘내면 ✅가 보여요! 💪`;
    if (xp < 100) return "거의 다 왔어요! ⚠️에서 ✅로 가기까지 한 걸음 남았습니다! 👍";
    return "완벽해요! 오늘의 목표를 달성했습니다! 🔥";
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '15px' }}>
      <h3>✍️ 오늘의 공부 다이어리</h3>
      
      {/* 자동 분석된 점수에 따른 격려 멘트 */}
      <div style={{ backgroundColor: '#f0f7ff', padding: '10px', borderRadius: '10px', marginBottom: '15px', color: '#007AFF', fontWeight: 'bold' }}>
        {getEncouragement(currentXP)}
      </div>

      <p>오늘의 점수: <strong>{currentXP} XP</strong></p>
      <textarea 
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="오늘 공부한 내용을 적어보세요."
        style={{ width: '100%', height: '100px', padding: '10px' }}
      />
      
      <button onClick={handleSave} className="save-button">
        {isUpdate ? "오늘 기록 수정하기" : "오늘 기록 저장하기"}
      </button>
    </div>
  );
}

export default DiaryInput;