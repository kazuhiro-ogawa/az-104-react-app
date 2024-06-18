import React, { useEffect, useState } from 'react';
import QuizScreen from './QuizScreen';

interface QuizData {
  questions: any[]; // 適切に型を定義することをおすすめします
}

interface QuizDataLoaderProps {
  mode: string;
}

const QuizDataLoader: React.FC<QuizDataLoaderProps> = ({ mode }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/quiz?mode=${mode}`);
        const data: QuizData = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
      setIsLoading(false);
    };

    if (mode === 'general') {
      fetchData();
    }
  }, [mode]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!quizData) {
    return <div>No data available</div>;
  }

  return <QuizScreen quizData={quizData} />;
};

export default QuizDataLoader;
