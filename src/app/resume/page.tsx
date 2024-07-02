"use client"
import Button from "@/components/Button";
import Modal from "@/components/modal";
import PackageCard from "@/components/selectedPlanCard";
import { OrderContext } from "@/context/order";
import { useContext } from "react";
import { useRouter } from "next/navigation";


export default function Resume() {
  const { 
    destination, 
    price, 
    planPrice, 
    meal,
    entertainment,
    selfcare,
    health,
    room,

   } = useContext(OrderContext);
  
   const router = useRouter();
  const planPrices: any= planPrice("meal")
  const entertainmentPlanPrices: any= planPrice("entertainment")
  const healthPlanPrices: any= planPrice("health")
  const roomPlanPrices: any= planPrice("room")
  const selfcarePlanPrices: any= planPrice("selfcare")

  return (
    <Modal imageUrl={destination === 'lua' ? '/base-lunar.png' : 'titan.png'}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <PackageCard
            imageUrl={entertainment === 'Básico' ? '/basic-entertainment.jpeg' : '/premium-entertainment.jpeg'}
            title={`Pacote de entretenimento - ${entertainment}`}
            price={entertainmentPlanPrices[entertainment]}
            onEdit={() => router.push('/select-entertainment')}
          />
          <PackageCard
            imageUrl={meal === 'Básico' ? '/basic-meal.jpg' : '/premium-meal.jpeg'}
            title={`Pacote de alimentação - ${meal}`}
            price={planPrices[meal]}
            onEdit={() => router.push('/select-meal')}
          />
          <PackageCard
            imageUrl={selfcare === 'Básico' ? '/basic-selfcare.jpeg' : '/premium-selfcare.jpeg'}
            title={`Pacote de cuidados pessoais - ${selfcare}`}
            price={selfcarePlanPrices[selfcare]}
            onEdit={() => router.push('/select-selfcare')}
          />
          <PackageCard
            imageUrl={health === 'Básico' ? '/basic-health.jpeg' : '/premium-health.jpeg'}
            title={`Pacote de saúde - ${health}`}
            price={healthPlanPrices[health]}
            onEdit={() => router.push('/select-health')}
          />
          <PackageCard
            imageUrl={room === 'Básico' ? '/basic-room.webp' : '/premium-room.webp'}
            title={`Pacote de quarto - ${room}`}
            price={roomPlanPrices[room]}
            onEdit={() => router.push('/select-room')}
          />
        </div>
        <div>
          <div className="text-2xl text-white mt-4 mb-6">
            Valor total: <span className="text-[#6960EE] font-bold">{price}</span>
          </div>
          <Button 
            title="Emitir passagem" 
            disabled={false}
            onClick={() => window.open('https://pyleyiwcydiznmrilviu.supabase.co/storage/v1/object/public/bucket/White_Blue_Simple_Modern_Boarding_Pass_Ticket__1_.pdf', '_blank')}
          />

        </div>
      </div>

    </Modal>
  );
}