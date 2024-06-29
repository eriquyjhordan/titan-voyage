import Image from "next/image";

export default function Header() {
  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-white text-xl font-semibold">Personalize sua Viagem</h2>
        <p className="text-gray-400">Uma experiência inesquecível</p>
      </div>
      <div className="flex justify-center mb-4">
        <Image src="../../public/titan-logo.svg" alt="Titan Voyager" width={86} height={77} />
      </div>
      <div className="mb-4">
        <h3 className="text-white text-lg font-semibold">Informações pessoais</h3>
      </div>
    </div>
  )
}