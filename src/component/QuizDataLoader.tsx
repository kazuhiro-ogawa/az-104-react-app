import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuizScreen from './QuizScreen';

interface Choice {
  choiceID: number;
  choiceText: string;
  isCorrect: boolean;
}

interface Question {
  questionID: number;
  questionText: string;
  answerExplanation: string;
  imagePath: string;
  choices: Choice[];
}

const QuizDataLoader: React.FC = () => {
  const location = useLocation();
  const { course } = location.state as { course: string };
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 環境変数の値をログに出力して確認
        console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
        console.log('API Key:', import.meta.env.VITE_API_KEY);
        
        // courseの値を修正して不要な部分を削除
        const cleanedCourse = course.replace(/^\(\d+\)/, '').trim();
        console.log('Cleaned Course:', cleanedCourse);

        const encodedCourse = encodeURIComponent(cleanedCourse);
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}?code=${import.meta.env.VITE_API_KEY}&categoryName=${encodedCourse}`;
        console.log(`Fetching data from: ${apiUrl}`);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error response: ${errorText}`);
          throw new Error(`Network response was not ok: ${response.statusText}\n${errorText}`);
        }

        const data: Question[] = await response.json();
        console.log("Fetched data: ", data);
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
        setError(error instanceof Error ? error.message : String(error));
      }

      setIsLoading(false);
    };

    fetchData();
  }, [course]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!questions) {
    return <div>No data available</div>;
  }

  return <QuizScreen questions={questions} />;
};

export default QuizDataLoader;
