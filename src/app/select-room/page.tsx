"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import PlanCard from "@/components/PlanCard";
import Modal from "@/components/modal";
import { OrderContext } from "@/context/order";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectRoom() {
  const router = useRouter();
  const { price, setPrice, destination, parsePrice, formatPrice, room, setRoom } = useContext(OrderContext);
  const [selectedPlan, setSelectedPlan] = useState<string>(room);

  const planPrices: { [key in "Básico" | "Premium"]: string } = { "Básico": "R$ 800k", "Premium": "R$ 1.2M" };

  const handleSelectPlan = (plan: "Básico" | "Premium") => {
    if (plan === selectedPlan) return;

    const dailyPrice = planPrices[plan];
    const dailyPriceValue = parsePrice(dailyPrice);
    const days = destination.toLowerCase() === "titan" ? 14 * 365 : 6;
    const totalPrice = dailyPriceValue * days;

    setPrice((prevPrice) => {
      let prevPriceValue = parsePrice(prevPrice);

      if (selectedPlan && selectedPlan !== plan) {
        const previousPlanPrice = planPrices[selectedPlan as "Básico" | "Premium"];
        const previousPlanValue = parsePrice(previousPlanPrice);
        const previousTotalPrice = previousPlanValue * days;
        prevPriceValue -= previousTotalPrice;
      }

      const newPriceValue = prevPriceValue + totalPrice;
      return formatPrice(newPriceValue);
    });

    setSelectedPlan(plan);
    setRoom(plan);
  };

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push('/select-room');
  }

  return (
    <Modal>
      <Header 
        title="Escolha o seguro saúde"
        price={price}
      />
      <div className="flex flex-col gap-5">
        <PlanCard 
          title="Básico"
          description="Opção econômica para sua estadia"
          price={planPrices["Básico"]}
          features={[
            "Quarto compartilhado",
            "Café da manhã no restaurante", 
            "Banheiro compartilhado",
          ]}
          isChecked={selectedPlan === "Básico"}
          onSelect={() => handleSelectPlan("Básico")}
        />
        <PlanCard 
          title="Premium"
          description="Conforto e privacidade para sua estadia"
          price={planPrices["Premium"]}
          features={[
            "Quarto individual c/ banheiro",
            "Cama de casal",
            "Café da manhã no quarto",
            "Vista panorâmica para o espaço",
          ]}
          isChecked={selectedPlan === "Premium"}
          onSelect={() => handleSelectPlan("Premium")}
        />
        <Button title="Continuar" disabled={selectedPlan === ""} onClick={handleContinue} />
      </div>
    </Modal>
  );
}