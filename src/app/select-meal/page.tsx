"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import PlanCard from "@/components/PlanCard";
import Modal from "@/components/modal";
import { OrderContext } from "@/context/order";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectMeal() {
  const router = useRouter();
  const { price, setPrice, destination, parsePrice, formatPrice, meal, setMeal, planPrice } = useContext(OrderContext);
  const [selectedPlan, setSelectedPlan] = useState<string>(meal);

  const planPrices: { [key in "Básico" | "Premium"]: string } = planPrice("meal");

  const handleSelectPlan = (plan: "Básico" | "Premium") => {
    if (plan === selectedPlan) return; // Exit if the selected plan hasn't changed

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
    setMeal(plan);
  };

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push('/select-health');
  }

  return (
    <Modal>
      <Header 
        title="Escolha o pacote de alimentação"
        price={price}
      />
      <div className="flex flex-col gap-5">
        <PlanCard 
          title="Básico"
          description="Alimentos que garantem a sobrevivência"
          price={planPrices["Básico"]}
          features={[
            "Enlatados",
            "Desidratados",
            "Barras de cereais",
            "Água purificada"
          ]}
          isChecked={selectedPlan === "Básico"}
          onSelect={() => handleSelectPlan("Básico")}
        />
        <PlanCard 
          title="Premium"
          description="Alimentos frescos e saborosos para uma viagem mais agradável"
          price={planPrices["Premium"]}
          features={[
            "Chef particular",
            "frutas",
            "Bebidas não alcoólicas",
            "Sobremesas",
          ]}
          isChecked={selectedPlan === "Premium"}
          onSelect={() => handleSelectPlan("Premium")}
        />
        <Button title="Continuar" disabled={selectedPlan === ""} onClick={handleContinue} />
      </div>
    </Modal>
  );
}