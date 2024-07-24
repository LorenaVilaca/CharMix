import React from 'react';

const FileInput = ({ label, onChange }) => {
  return (
    <div>
      <h2>{label}</h2>
      <input type="file" onChange={onChange} />
    </div>
  );
};

export default FileInput;
