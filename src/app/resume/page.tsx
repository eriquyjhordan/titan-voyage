"use client"
import Button from "@/components/Button";
import Modal from "@/components/modal";
import PackageCard from "@/components/selectedPlanCard";
import { OrderContext } from "@/context/order";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://dknjilieeiasicsinyst.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbmppbGllZWlhc2ljc2lueXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MTk1MTcsImV4cCI6MjAzNTQ5NTUxN30.wwhdDRiuftdoG4fouMiX5Vt6YU6TOPv3nQSZ3iLz6js')


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
    name,
    birthday,
    weight,
    gender,
  } = useContext(OrderContext);

  const router = useRouter();
  const planPrices: any = planPrice("meal")
  const entertainmentPlanPrices: any = planPrice("entertainment")
  const healthPlanPrices: any = planPrice("health")
  const roomPlanPrices: any = planPrice("room")
  const selfcarePlanPrices: any = planPrice("selfcare")

  async function handleSubmit() {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          name,
          // birthday: dd/mm/yyyy to yyyy-mm-dd,
          birthday: birthday.split('/').reverse().join('-'),
          weight,
          gender,
          destination,
          room,
          meal,
          entertainment,
          selfcare,
          health,
          price
        }
      ])
    if (error) {
      console.error(error)
    }
    window.open('https://pyleyiwcydiznmrilviu.supabase.co/storage/v1/object/public/bucket/White_Blue_Simple_Modern_Boarding_Pass_Ticket__1_.pdf', '_blank')
  }

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
            onClick={handleSubmit}
          />

        </div>
      </div>

    </Modal>
  );
}