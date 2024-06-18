import React, { useState } from 'react';
import axios from 'axios';

// コンポーネントの型定義
interface QuizGeneratorProps {
  apiUrl: string; // APIのエンドポイントURL
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ apiUrl }) => {
  const [topic, setTopic] = useState<string>(''); // トピックを入力するための状態
  const [question, setQuestion] = useState<string>(''); // APIから受け取った問題文を保存する状態
  const [error, setError] = useState<string>(''); // エラーメッセージを管理

  // 問題を生成する関数
  const generateQuestion = async () => {
    try {
      const response = await axios.post(apiUrl, {
        prompt: `Azure Administrator(AZ-104)の${topic}に関する4択問題を生成してください。選択肢はA、B、C、Dです。`,
        max_tokens: 100
      });
      setQuestion(response.data.choices[0].message.content);
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('問題を生成する際にエラーが発生しました。');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="トピックを入力してください"
      />
      <button onClick={generateQuestion}>問題生成</button>
      {question && <div><strong>生成された問題:</strong> {question}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default QuizGenerator;