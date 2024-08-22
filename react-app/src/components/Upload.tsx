import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './Upload.css';
import Loading from './Loading';
import Questions from './Questions';
import Result from './Result';
import FinalScreen from './FinalScreen';
import HandleAnimations from './animations/HandleAnimations';

const Upload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [view, setView] = useState<'upload' | 'loading' | 'questions' | 'result' | 'final'>('upload');
  const [questions, setQuestions] = useState<any[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log('fileInputRef in Upload:', fileInputRef.current);
  }, [fileInputRef]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setView('loading');
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://127.0.0.1:5000/upload', formData);
        const { questions, correct_answers } = response.data;
        setQuestions(questions);
        setCorrectAnswers(correct_answers.length);
        setView('questions');
      } catch (error) {
        console.error('Error uploading file:', error);
        setView('upload');
      }
    }
  };

  const handleFinish = (correctAnswersCount: number) => {
    setScore(correctAnswersCount);

    // Lisää sekunnin viive ennen siirtymistä 'result' -näkymään
    setTimeout(() => {
      setView('result');

      // Lisää 6 sekunnin viive ennen siirtymistä 'final' -näkymään
      setTimeout(() => {
        setView('final');
      }, 6000); // 6 sekunnin viive ennen FinalScreen-näkymää

    }, 1); // 1 sekunnin viive ennen Result-näkymää
  };

  const handleRetry = () => {
    setView('loading');
    setTimeout(() => {
      setView('questions');
    }, 3000);
  };

  const handleUploadAnother = () => {
    setView('upload');
  };

  return (
    <div className="upload-container flex-center">
      <HandleAnimations in={view === 'upload'}>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden-input"
          />
          <button className="upload-button box" onClick={handleButtonClick}>
            Drop your files here
          </button>
        </div>
      </HandleAnimations>
      <HandleAnimations in={view === 'loading'}>
        <Loading />
      </HandleAnimations>
      <HandleAnimations in={view === 'questions'}>
        <Questions questions={questions} onFinish={handleFinish} />
      </HandleAnimations>
      <HandleAnimations in={view === 'result'}>
        <Result 
          correctAnswers={score} 
          totalQuestions={questions.length}
        />
      </HandleAnimations>
      <HandleAnimations in={view === 'final'}>
        <FinalScreen 
          onRetry={handleRetry}
          onUploadAnother={handleUploadAnother}
        />
      </HandleAnimations>
    </div>
  );
};

export default Upload;
