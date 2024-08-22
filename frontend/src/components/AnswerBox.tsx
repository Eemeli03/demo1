import React from 'react';
import './AnswerBox.css';

interface AnswerBoxProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  isSelected: boolean;
  isCorrect: boolean;
  showCorrectAnswer: boolean;
  answered: boolean;  // Lisää uusi proppi
}

const AnswerBox: React.FC<AnswerBoxProps> = ({
  onClick,
  className = '',
  children,
  isSelected,
  isCorrect,
  showCorrectAnswer,
  answered,
}) => {
  let boxStyle = '';

  if (showCorrectAnswer) {
    if (isCorrect) {
      boxStyle = 'correct-answer';
    } else if (isSelected) {
      boxStyle = 'incorrect-answer';
    }
  }

  return (
    <div
      className={`answer-box ${boxStyle} ${answered ? 'answered' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AnswerBox;
