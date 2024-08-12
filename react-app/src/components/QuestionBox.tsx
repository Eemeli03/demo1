import React from 'react';
import './QuestionBox.css';

interface QuestionBoxProps {
  question: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question }) => {
  return (
    <div className="question-box box">
      <p>{question}</p>
    </div>
  );
};

export default QuestionBox;
