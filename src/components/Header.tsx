import Image from "next/image";

interface HeaderProps {
  title?: string;
  price?: string;
}

export default function Header({ title = 'Informações pessoais', price }: HeaderProps) {
  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        <div className="">
          <h2 className="text-white text-base font-semibold">{price ? 'Investimento na viagem' : 'Personalize sua Viagem' }</h2>
          {!price && <p className="text-gray-400 text-sm">Uma experiência inesquecível</p>} 
          {price && <p className="text-2xl font-bold text-[#6639E5]">{price}</p>} 
        </div>
        <div className="flex justify-center mb-4">
          <Image src="/titan-logo.svg" alt="Titan Voyager" width={86} height={77} />
        </div>
      </div>
      <hr className="border-neutral-900 mb-4" />
      <div className="mb-4">
        <h3 className="text-white text-center text-lg font-semibold max-w-[200px] mx-auto ">{title}</h3>
      </div>
    </div>
  )
}