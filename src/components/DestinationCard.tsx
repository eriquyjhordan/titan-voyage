import { FaCheck } from "react-icons/fa6";

interface DestinationCardProps {
  backgroundImage: string;
  isChecked: boolean;
  onCheckboxChange: () => void;
  title: string;
  distance: string;
  travelTime: string;
  exploration: string;
  price: string;
}

const DestinationCard = ({ backgroundImage, isChecked, onCheckboxChange, distance, exploration, title, travelTime, price }: DestinationCardProps) => {
  return (
    <div
      className="relative w-full max-w-[450px] bg-cover bg-center rounded-lg shadow-lg p-5 flex flex-col justify-between"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg"></div>
      <div className="z-10 flex items-center gap-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
          className="form-checkbox h-5 w-5"
        />
        <h2 className="text-white text-xl font-bold">{title}</h2>
      </div>
      <div className="relative z-10 text-white mt-6">
        <ul className="space-y-2">
          <div className="flex gap-4">
            <FaCheck size={18} color="#ddd"  />
            <li className='text-white text-sm'>{distance}</li>
          </div>
          <div className="flex gap-4">
            <FaCheck size={18} color="#ddd" />
            <li className='text-white text-sm'>{travelTime}</li>
          </div>
          <div className="flex gap-4">
            <FaCheck size={18} color="#ddd" />
            <li className='text-white text-sm'>{exploration}</li>
          </div>
        </ul>
      </div>
      <div className="flex flex-col items-end z-10 text-white text-2xl mt-4">
          <span className='text-xs'>A partir de</span>
         <span className="text-purple-600 font-bold">R$ {price}</span>
      </div>
    </div>
  );
};

export default DestinationCard;