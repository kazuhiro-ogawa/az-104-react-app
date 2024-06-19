import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseNames } from './StringDic';

const SelectCourse = () => {
  const [course, setCourse] = useState(courseNames[0]);
  const [isGenerated, setIsGenerated] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    const path = isGenerated ? 'gpt' : 'general';
    navigate(`/quiz/${path}`, { state: { course } });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h3 className="ml-3 text-sm font-medium text-gray-900">分野</h3>
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="mb-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        {courseNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-3 text-sm font-medium text-gray-900">一般問題</span>
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isGenerated}
            onChange={(e) => setIsGenerated(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </div>
        <span className="ml-3 text-sm font-medium text-gray-900">生成問題</span>
      </label>
      <div className="mt-4">
        <button
          onClick={handleStart}
          className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          スタート
        </button>
      </div>
    </div>
  );
};

export default SelectCourse;
