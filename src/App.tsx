import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Title from "./component/Title";
import SelectCourse from "./component/SelectCourse";
import QuizDataLoader from "./component/QuizDataLoader"; // QuizScreenの代わりにQuizDataLoaderをインポート

const App = () => {
  return (
    <Router>
      <div>
        <Title />
        <Routes>
          <Route path="/" element={<SelectCourse />} />
          <Route path="/quiz/:mode" element={<QuizLoaderWrapper />} /> {/* QuizDataLoaderをラップするコンポーネントを使用 */}
        </Routes>
      </div>
    </Router>
  );
};

const QuizLoaderWrapper = () => {
  const { mode } = useParams<{ mode: string }>();

  // modeがundefinedでないことを確認
  if (!mode) {
    return <div>Error: Mode is not defined</div>;
  }

  return <QuizDataLoader mode={mode} />;
};

export default App;
