import axios from 'axios';
import { useEffect, useState } from 'react';

const QuestionsApp = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    CategoryID: '',
    QuestionText: '',
    AnswerExplanation: '',
    Choices: [{ ChoiceText: '', IsCorrect: false }]
  });

  useEffect(() => {
    // カテゴリ一覧を取得する関数
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/get_categories'); // カテゴリを取得するエンドポイント
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    // 選択されたカテゴリIDで質問を取得する
    try {
      const response = await axios.get(`/api/manage_questions?category_id=${categoryId}`);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleChoiceChange = (index, field, value) => {
    const updatedChoices = newQuestion.Choices.map((choice, i) => (
      i === index ? { ...choice, [field]: value } : choice
    ));
    setNewQuestion({ ...newQuestion, Choices: updatedChoices });
  };

  const handleAddChoice = () => {
    setNewQuestion({
      ...newQuestion,
      Choices: [...newQuestion.Choices, { ChoiceText: '', IsCorrect: false }]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/manage_questions', newQuestion);
      console.log('Question added:', response.data);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      <h1>Azure Administrator (AZ-104) 勉強アプリ</h1>
      <label htmlFor="category">カテゴリを選択:</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">選択してください</option>
        {categories.map((category) => (
          <option key={category.CategoryID} value={category.CategoryID}>
            {category.Category}
          </option>
        ))}
      </select>

      <div>
        <h2>質問一覧</h2>
        {questions.map((question) => (
          <div key={question.QuestionID}>
            <h3>{question.QuestionText}</h3>
            {question.Image && (
              <div>
                <img src={question.Image.ImagePath} alt={question.Image.Description} />
                <p>{question.Image.Description}</p>
              </div>
            )}
            <ul>
              {question.Choices.map((choice) => (
                <li key={choice.ChoiceID}>{choice.ChoiceText}</li>
              ))}
            </ul>
            <p>{question.AnswerExplanation}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <h2>新しい質問を追加</h2>
        <label>
          カテゴリID:
          <input
            type="number"
            name="CategoryID"
            value={newQuestion.CategoryID}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          問題文:
          <input
            type="text"
            name="QuestionText"
            value={newQuestion.QuestionText}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          解答の説明:
          <textarea
            name="AnswerExplanation"
            value={newQuestion.AnswerExplanation}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <h3>選択肢</h3>
          {newQuestion.Choices.map((choice, index) => (
            <div key={index}>
              <label>
                選択肢のテキスト:
                <input
                  type="text"
                  value={choice.ChoiceText}
                  onChange={(e) => handleChoiceChange(index, 'ChoiceText', e.target.value)}
                  required
                />
              </label>
              <label>
                正解かどうか:
                <input
                  type="checkbox"
                  checked={choice.IsCorrect}
                  onChange={(e) => handleChoiceChange(index, 'IsCorrect', e.target.checked)}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={handleAddChoice}>選択肢を追加</button>
        </div>
        <button type="submit">質問を追加</button>
      </form>
    </div>
  );
};

export default QuestionsApp;
