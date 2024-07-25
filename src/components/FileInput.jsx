import React from 'react';

const FileInput = ({ label, onChange }) => {
  return (
    <label className='bg-white cursor-pointer w-full h-10 rounded-xl flex p-2'>
      <div className='text-black flex items-center opacity-50'>
        <h2>{label}</h2>
      </div>
      <input type="file" onChange={onChange} className="hidden"/>
    </label>
  );
};

export default FileInput;
