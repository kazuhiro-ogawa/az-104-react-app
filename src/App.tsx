// App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Title from "./component/Title"
import SelectCourse from "./component/SelectCourse"
import QuizScreen from "./component/QuizScreen";


const App = () => {

  return (
    <Router>
      <div>
        <Title/>
        <Routes>
          <Route path="/" element={<SelectCourse/>} />
          <Route path="/quiz/:mode" element={<QuizScreen/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
