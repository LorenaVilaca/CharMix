
import React from 'react';
import {Select, SelectItem} from "@nextui-org/react";
// import Select from 'react-select';

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
  { value: 'Location', label: 'Location' },
];

const ImageSelect = ({ onChange }) => {
  return (
    <div>
      <h1 className='font-bold text-4xl py-1'> Categoria do Complemento </h1>
      <Select 
            label="" 
            className="w-[544px]" 
            classNames={{ value:'font-bold text-3xl', trigger: 'h-20 w-[544px] bg-[#3E3E3E]', label:''}}
            onChange={
              onChange
            }
          >
            {options.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            ))}
      </Select>
    </div>
  );
};

export default ImageSelect;
