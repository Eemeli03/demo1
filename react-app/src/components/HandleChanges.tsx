import { useState } from 'react';

type View = 'upload' | 'loading' | 'questions' | 'result';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const useViewHandler = () => {
  const [view, setView] = useState<View>('upload');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const handleFileChange = (file: File) => {
    setView('loading');
    console.log('File selected:', file);
    // Simulate a file upload delay
    setTimeout(() => {
      setView('questions');
    }, 50000);
  };

  const handleFinish = (correct: number, total: number) => {
    setCorrectAnswersCount(correct);
    setView('result');
  };

  const handleRetry = () => {
    setView('loading');
    // Simulate a loading delay before starting questions again
    setTimeout(() => {
      setView('questions');
    }, 10000);
  };

  const handleUploadAnother = () => {
    setView('upload');
  };

  return {
    view,
    setView,
    questions,
    setQuestions,
    correctAnswersCount,
    setCorrectAnswersCount,
    handleFinish,
    handleRetry,
    handleUploadAnother,
  };
};

export default useViewHandler;
