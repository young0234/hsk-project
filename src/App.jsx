import React from 'react';
import MainPage from './components/MainPage';
import InputPage from './components/InputPage';
import MountainBg from './components/background/WatercolorMountain';
import { useDiary } from './hooks/useDiary';
import './App.css';

function App() {
  const {
    page,
    logs,
    currentXP,
    setCurrentXP,
    existingRecord,
    setSelectedFile,
    handleSaveDiary,
    handleEditMove,
    handleDelete,
    goToInput,
    goToMain,
  } = useDiary();

  return (
    <div className="container">
      {/* <MountainBg /> */}
      {page === 'main' ? (
        <MainPage
          logs={logs}
          onMove={goToInput}
          onUpdate={(id) => {
            const record = logs.find((l) => l.id === id);
            handleEditMove(record);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <InputPage
          currentXP={currentXP}
          setCurrentXP={setCurrentXP}
          onSave={handleSaveDiary}
          onBack={goToMain}
          existingRecord={existingRecord}
          setSelectedFile={setSelectedFile}
        />
      )}
    </div>
  );
}

export default App;
