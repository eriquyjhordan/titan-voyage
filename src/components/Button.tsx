import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  disabled?: boolean;
}



const Button = ({ title, disabled = true, ...rest }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700'}
        w-full px-4 py-2 mb-8 rounded-lg  text-white font-semibold 
        focus:outline-none focus:ring-2 focus:ring-purple-600
        `}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;