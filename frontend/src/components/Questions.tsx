import React, { useState } from 'react';
import './Questions.css';
import './CommonStyles.css';
import QuestionBox from './QuestionBox';
import AnswerBox from './AnswerBox';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface QuestionsProps {
  questions: Question[];
  onFinish: (correctAnswers: number, totalQuestions: number) => void;
}

const Questions: React.FC<QuestionsProps> = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return; // Estää valitsemasta vastausta uudelleen

    setSelectedAnswer(answer);
    const isCorrect = questions[currentQuestionIndex].correctAnswer === answer;

    if (isCorrect) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }

    setShowCorrectAnswer(true);

    // Siirrytään seuraavaan kysymykseen 1.5 sekunnin viiveellä
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowCorrectAnswer(false);
      } else {
        onFinish(isCorrect ? correctAnswersCount + 1 : correctAnswersCount, questions.length);
      }
    }, 1000);
  };

  return (
    <div className="questions-container box">
      <QuestionBox question={questions[currentQuestionIndex].question} />
      <div className="answers-container">
        {questions[currentQuestionIndex].answers.map((answer, index) => (
          <AnswerBox
            key={index}
            onClick={() => handleAnswerClick(answer)}
            isSelected={answer === selectedAnswer}
            isCorrect={answer === questions[currentQuestionIndex].correctAnswer}
            showCorrectAnswer={showCorrectAnswer}
            answered={selectedAnswer !== null}  // Lähetetään answered-proppi
          >
            {answer}
          </AnswerBox>
        ))}
      </div>
    </div>
  );
};

export default Questions;
