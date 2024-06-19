import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ImageComponent from './ImageComponent';

interface Question {
  questionID: number;
  questionText: string;
  answerExplanation: string;
  imagePath: string;
  choices: {
    choiceID: number;
    choiceText: string;
    isCorrect: boolean;
  }[];
}

interface QuizScreenProps {
  questions: Question[];
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions }) => {
  const { mode } = useParams<{ mode: string }>();
  const location = useLocation() as { state: { course: string } };
  const { course } = location.state;

  console.log("Selected Course:", course);
  console.log("Quiz Mode:", mode);

  const testBlobName = 'テスト画像.jpg';

  return (
    <div>
      <h1>Quiz Screen</h1>
      <p>Selected Course: {course}</p>
      <p>Quiz Mode: {mode === 'general' ? 'General Questions' : 'Generated Questions'}</p>
      <ImageComponent blobName={testBlobName} />
      <div>
        {/* ここでquestionsを使用してクイズの問題を表示 */}
        {questions.map((question, index) => (
          <div key={index}>
            <h2>{question.questionText}</h2>
            {/* 他の質問の詳細を表示 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
