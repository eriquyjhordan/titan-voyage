import Image from "next/image";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        <div className="">
          <h2 className="text-white text-base font-semibold">Personalize sua Viagem</h2>
          <p className="text-gray-400 text-sm">Uma experiência inesquecível</p>
        </div>
        <div className="flex justify-center mb-4">
          <Image src="/titan-logo.svg" alt="Titan Voyager" width={86} height={77} />
        </div>
      </div>
      <hr className="border-neutral-900 mb-4" />
      <div className="mb-4">
        <h3 className="text-white text-lg font-semibold">Informações pessoais</h3>
      </div>
    </div>
  )
}