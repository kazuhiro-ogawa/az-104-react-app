// SelectCourse.tsx

import { courseNames } from './StringDic';

const SelectCourse = () => {

  // クリックイベントハンドラの型宣言
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked", event.currentTarget.textContent);
  };

  // コース名からボタンを生成
  // buttonのclassNameは、
  const buttons = courseNames.map((name, index) => (
    <button key={index}
     onClick={handleClick}
     className="w-64 py-2 mb-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md">
      {name}
    </button>
  ));

  return (
    <div className="flex flex-col items-center justify-center">
      {buttons}
    </div>
  )
}

export default SelectCourse
