import React, { useState } from 'react';

const FileInput = ({ label, onChange }) => {
  let val

  const [fileImage, setFileImage] = useState('');

  const handleOnChange = (value) => {
    console.log(value.target.value)
    setFileImage(value.target.value)
    onChange(value)
  }

  return (
    <div className=''>
      <h1 className='font-bold text-4xl py-1'> {label} </h1>
      <label className='bg-[#3E3E3E] h-20 cursor-pointer w-[544px] rounded-xl flex p-2'>
        <div className='text-white flex items-center opacity-50'>
          {}
          <h2>{fileImage ? fileImage.split(/(\\|\/)/g).pop() : label}</h2>
        </div>
        <input type="file" onChange={handleOnChange} className="hidden"/>
      </label>
    </div>
  );
};

export default FileInput;
