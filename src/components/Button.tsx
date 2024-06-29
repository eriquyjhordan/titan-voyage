import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}



const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <button
      className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;