// ApiTester.tsx
// OpenAI APIの動き確認用

import React, { useState } from 'react';
import axios from 'axios';

const ApiTester = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post('http://localhost:3000/api/openai', { prompt: input });
      // choices[0].message.content の内容を取り出して状態にセットする
      console.log(result.data);
      const messageText = result.data.choices[0].message.content;
      setResponse(messageText);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to fetch data.');
    }
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default ApiTester;
