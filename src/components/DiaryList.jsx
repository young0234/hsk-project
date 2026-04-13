// src/components/DiaryList.jsx
import React from 'react';

function DiaryList({ logs, onUpdate, onDelete }) {
  return (
    <div> 
      {logs.length === 0 ? <p>아직 기록이 없어요.</p> : (
        logs.map((log) => (
          <div key={log.id}>
            <div style={{display: 'flex'}}>
              {log.imageUrl && (
                <div style={{flex: 1}}>
                  <img src={log.imageUrl} alt="인증샷" style={{ width: '100%', borderRadius: '10px' }} />
                </div>
              )}

              <div style={{flex: 1}}>
                <div className='line-wrap'>
                  <div style={{ fontWeight: 'bold', color: log.xp >= 100 ? 'green' : 'orange' }}>{log.xp}XP</div>
                  <p>{log.memo}</p>
                </div>

                <div className='line-wrap'>
                  <h3>오늘의 단어</h3>
                  <span>한자 (병음) 뜻</span>

                </div>

                <button 
                  onClick={() => onDelete(log.id)}
                  style={{ fontSize: '12px', color: 'red', cursor: 'pointer' }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DiaryList;