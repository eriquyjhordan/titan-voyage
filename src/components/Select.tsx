import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

const Select = ({ label, options, ...props }: SelectProps) => {
  return (
    <div className="">
      <label className="block text-white mb-2 text-sm">{label}</label>
      <div className="relative">
        <select
          className="w-full px-4 py-2 pr-10 text-sm rounded-lg bg-neutral-800 text-white border-2 border-neutral-900 appearance-none outline-none"
          {...props}
        >
          <option value="" className='text-neutral-100'>Selecione</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;