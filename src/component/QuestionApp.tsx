import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Category {
  CategoryID: string;
  Category: string;
}

interface Choice {
  ChoiceID?: string;
  ChoiceText: string;
  IsCorrect: boolean;
}

interface Question {
  QuestionID: string;
  CategoryID: string;
  QuestionText: string;
  AnswerExplanation: string;
  Image?: {
    ImagePath: string;
    Description: string;
  };
  Choices: Choice[];
}

const QuestionsApp = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question>({
    QuestionID: '',
    CategoryID: '',
    QuestionText: '',
    AnswerExplanation: '',
    Choices: [{ ChoiceText: '', IsCorrect: false }]
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/get_categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    try {
      const response = await axios.get(`/api/manage_questions?category_id=${categoryId}`);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleChoiceChange = (index: number, field: string, value: string | boolean) => {
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

  const handleSubmit = async (event: FormEvent) => {
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
