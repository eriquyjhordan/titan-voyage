import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface PlanCardProps  {
  title: string;
  description: string;
  price: string;
  features: string[];
  isChecked: boolean;
  onSelect?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, description, price, features, isChecked, onSelect }) => { 
  const buttonStyle = isChecked
    ? "w-full py-2 mb-4 border border-[#9DB0FF] bg-[#6960EE] text-white rounded"
    : "w-full py-2 mb-4 border border-[#9DB0FF] text-[#6960EE] rounded";

  const buttonText = isChecked ? "Plano Selecionado" : "Selecionar Plano";

  return (
    <div className="flex flex-col gap-2 w-full rounded-lg shadow-md p-6 text-white border border-neutral-100">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="text-2xl font-bold mb-4">
        {price} <span className="text-base -ml-1">/dia</span>
      </div>
      <button className={buttonStyle} onClick={onSelect}> 
        {buttonText}
      </button>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FaCheck size={16} className="mr-2 text-green-500" /> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;