// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHtSCBL18AOSsBvqcP1J7rPV3slJUJuuM",
    authDomain: "hsk-diary-project.firebaseapp.com",
    projectId: "hsk-diary-project",
    storageBucket: "hsk-diary-project.firebasestorage.app",
    messagingSenderId: "807963020851",
    appId: "1:807963020851:web:e4a5e7e28449d5e465dd46"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // 이 'db'를 다른 파일들이 쓸 수 있게 내보냅니다.