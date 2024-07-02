import React from 'react';
import Image from 'next/image';

interface PackageCardProps {
  imageUrl: string;
  title: string;
  price: string;
  onEdit: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ imageUrl, title, price, onEdit }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center">
      <div className="w-16 h-16 relative flex-shrink-0">
        <Image src={imageUrl} alt="Package Image" layout="fill" objectFit="cover" className="rounded-md" />
      </div>
      <div className="ml-4 flex-grow">
        <div className="text-base font-medium">{title}</div>
        <div className="text-lg font-bold">{price}</div>
      </div>
      <div className="text-purple-500 ml-4 cursor-pointer" onClick={onEdit}>Alterar</div>
    </div>
  );
};

export default PackageCard;