import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export function useDiary() {
  const [page, setPage] = useState('main');
  const [logs, setLogs] = useState([]);
  const [currentXP, setCurrentXP] = useState(0);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const todayRecord = logs.find(
    (log) => log.date === new Date().toLocaleDateString()
  );

  const fetchLogs = async () => {
    try {
      const q = query(
        collection(db, 'hsk_diary'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        id: docSnap.id,
      }));
      setLogs(data);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSaveDiary = async (memo) => {
    try {
      const baseRecord = editingRecord ?? todayRecord;
      let imageUrl = baseRecord?.imageUrl || '';

      if (selectedFile) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `diary_images/${Date.now()}_${selectedFile.name}`
        );
        const snapshot = await uploadBytes(storageRef, selectedFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const todayStr = new Date().toLocaleDateString();
      const diaryData = {
        // 신규 저장은 항상 오늘 날짜만 (과거 날짜로 새 기록 방지)
        date: baseRecord ? baseRecord.date : todayStr,
        xp: currentXP,
        memo,
        imageUrl,
        updatedAt: serverTimestamp(),
      };

      if (baseRecord) {
        await updateDoc(doc(db, 'hsk_diary', baseRecord.id), diaryData);
      } else {
        await addDoc(collection(db, 'hsk_diary'), {
          ...diaryData,
          createdAt: serverTimestamp(),
        });
      }

      alert('기록과 사진이 저장되었습니다! 🎉');
      await fetchLogs();
      setPage('main');
      setEditingRecord(null);
      setSelectedFile(null);
    } catch (e) {
      console.error(e);
      alert('저장 중 에러가 발생했습니다.');
    }
  };

  const handleEditMove = (record) => {
    setEditingRecord(record);
    setCurrentXP(record.xp);
    setPage('input');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'hsk_diary', id));
      fetchLogs();
    } catch (e) {
      console.error(e);
    }
  };

  const goToInput = () => {
    setEditingRecord(null);
    setCurrentXP(todayRecord?.xp ?? 0);
    setPage('input');
  };

  const goToMain = () => {
    setPage('main');
    setCurrentXP(0);
    setEditingRecord(null);
  };

  return {
    page,
    setPage,
    logs,
    currentXP,
    setCurrentXP,
    todayRecord,
    editingRecord,
    selectedFile,
    setSelectedFile,
    existingRecord: editingRecord ?? todayRecord,
    handleSaveDiary,
    handleEditMove,
    handleDelete,
    goToInput,
    goToMain,
  };
}
