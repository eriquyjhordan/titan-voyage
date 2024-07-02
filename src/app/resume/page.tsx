"use client"
import Button from "@/components/Button";
import Modal from "@/components/modal";
import PackageCard from "@/components/selectedPlanCard";
import { OrderContext } from "@/context/order";
import { useContext } from "react";

export default function Resume() {
  const { destination, price } = useContext(OrderContext);

  return (
    <Modal imageUrl={destination === 'lua' ? '/base-lunar.png' : 'titan.png'}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <PackageCard
            imageUrl="/basic-meal.jpg"
            title="Pacote de alimentação"
            price="R$ 515K"
            onEdit={() => { }}
          />

          {/* valor total  */}
        </div>
        <div>
          <div className="text-2xl text-white mt-4 mb-6">
            Valor total: <span className="text-[#6960EE] font-bold">{price}</span>
          </div>
          <Button title="Emitir passagem" />

        </div>
      </div>

    </Modal>
  );
}