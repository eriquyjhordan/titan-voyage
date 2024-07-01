"use client";
import Button from "@/components/Button";
import DestinationCard from "@/components/DestinationCard";
import Header from "@/components/Header";
import Modal from "@/components/modal";
import { OrderContext } from "@/context/order";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectDestination() {
  const router = useRouter();
  const [titanChecked, setTitanChecked] = useState<boolean>(false)
  const [luaChecked, setLuaChecked] = useState<boolean>(false)
  const { setDestination, setPrice } = useContext(OrderContext)

  function handleChangeDestination(destination: string) {
    if (destination === "titan") {
      setTitanChecked(!titanChecked)
      setLuaChecked(false)
      setDestination("titan")
      setPrice("R$ 3.2B")
    } else {
      setLuaChecked(!luaChecked)
      setTitanChecked(false)
      setDestination("lua")
      setPrice("R$ 1.15M")
    }
  }

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push('/select-entertainment');
  }

  return (
    <Modal>
      <Header
        title="Selecione o Destino da sua Viagem"
      />
      <div className="flex flex-col items-center mt-8 gap-6">
        <DestinationCard 
          backgroundImage="/titan.png"
          isChecked={titanChecked}
          onCheckboxChange={() => handleChangeDestination("titan")}
          title="Titan - Lua de Saturno"
          distance="1.4 bilhões de quilômetros da Terra"
          travelTime="14 anos para ir e volta"
          exploration="Exploração e Pesquisa"
          price="3.2B"
        />
        <DestinationCard 
          backgroundImage="/base-lunar.png"
          isChecked={luaChecked}
          onCheckboxChange={() => handleChangeDestination("lua")}
          title="Base lunar"
          distance="384.400 quilômetros da Terra"
          travelTime="6 dias para ir e volta"
          exploration="Tour pela base de lançamento"
          price="1.15M"
        />
        <Button title="Continuar" disabled={!luaChecked && !titanChecked} onClick={handleContinue} />
      </div>
    </Modal>
  )
}