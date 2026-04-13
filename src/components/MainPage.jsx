import React, { useState } from 'react'; // useState 추가
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DiaryList from './DiaryList';

/** 로컬 자정 기준 — 캘린더 minDate·선택값과 맞춤 */
function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function MainPage({ logs, onMove, onUpdate, onDelete }) {
  // 마운트할 때마다 오늘로 시작 (메인 복귀 시에도 부모 조건부 렌더로 리마운트됨)
  const [selectedDate, setSelectedDate] = useState(startOfToday);

  // 선택된 날짜의 문자열 (예: "2026. 2. 13.")
  const dateString = selectedDate.toLocaleDateString();
  
  // 💡 전체 로그 중 선택된 날짜와 일치하는 기록만 찾기
  const filteredLogs = logs.filter(log => log.date === dateString);

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dStr = date.toLocaleDateString();
      const log = logs.find(l => l.date === dStr);
      if (!log) return null;
      if (log.xp >= 100) return <div className="tile-icon">✅</div>;
      if (log.xp >= 50) return <div className="tile-icon">⚠️</div>;
      return <div className="tile-icon">❌</div>;
    }
  };

  return (
    <div className="main-page">
      {/* <h2>🇨🇳 HSK 공부 다이어리</h2> */}
      
      <div className="main-wrap">
        <div className='left'>
          <div className="calendar-wrapper">
            <Calendar 
              onChange={setSelectedDate} // 💡 날짜 클릭 시 상태 변경
              value={selectedDate}
              minDate={startOfToday()}
              tileContent={getTileContent} 
              calendarType="gregory"
              minDetail="month"
              maxDetail="month"
            />
          </div>
          <div className='cheering-message-wrap'>
            <h3>오늘의 응원 멘트!</h3>
            <p>상단의 응원멘트에 랜덤으로 나오게 됩니다</p>
            <input type="text" name="" id="" />
          </div>
        </div>

        <div className='right'>
          <div className="selected-date-info">
            <h4 style={{marginTop : 0}}>{dateString}</h4>
            {/* 💡 필터링된 기록만 DiaryList에 전달 */}
            <DiaryList 
              logs={filteredLogs} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
            />
          </div>
        </div>
      </div>

      <button className="nav-button" onClick={onMove}>오늘 기록 저장하기</button>
    </div>
  );
}

export default MainPage;