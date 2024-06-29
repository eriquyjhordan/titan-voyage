import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="block text-white text-sm">{label}</label>
      <input
        className="w-full px-4 py-2 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 border-neutral-600 border-2 text-sm"
        {...rest}
      />
    </div>
  );
};

export default Input;