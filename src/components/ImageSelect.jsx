
import React from 'react';
import Select from 'react-select';

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

const options = [
  { value: 'Object', label: 'Object' },
  { value: 'Character', label: 'Character' },
  { value: 'Food', label: 'Food' },
  { value: 'Person', label: 'Person' },
  { value: 'Animal', label: 'Animal' },
];

const ImageSelect = ({ onChange }) => {
  return (
    <div>
      <p>What is the type of your second image?</p>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        isClearable
        isSearchable
        options={options}
        styles={customStyles}
        onChange={onChange}
      />
    </div>
  );
};

export default ImageSelect;
