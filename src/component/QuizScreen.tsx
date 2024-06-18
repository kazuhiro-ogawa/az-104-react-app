// QuizScreen.tsx

import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ImageComponent from './ImageComponent'; 

const QuizScreen = () => {
  const { mode } = useParams(); // URLからmodeパラメータを取得
  const location = useLocation();
  const { course } = location.state;  // `state` から `course` を取り出す

  console.log("Select Course:", course);
  console.log("Quiz Mode:", mode);

  const testBlobName = 'テスト画像.jpg';

  return (
    <div>
      <h1>Quiz Screen</h1>
      <p>Selected Course: {course}</p>  {/* 取り出した `course` を表示 */}
      <p>Quiz Mode: {mode === 'general' ? 'General Questions' : 'Generated Questions'}</p>
      <ImageComponent blobName={testBlobName} />
    </div>
  );
}

export default QuizScreen;
