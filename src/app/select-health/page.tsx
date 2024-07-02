"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import PlanCard from "@/components/PlanCard";
import Modal from "@/components/modal";
import { OrderContext } from "@/context/order";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectHealth() {
  const router = useRouter();
  const { price, setPrice, destination, parsePrice, formatPrice, health, setHealth } = useContext(OrderContext);
  const [selectedPlan, setSelectedPlan] = useState<string>(health);

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
    setHealth(plan);
  };

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push('/select-selfcare');
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
          description="Seguro saúde para emergências"
          price={planPrices["Básico"]}
          features={[
            "Emergências",
            "Desconto em consultas",
            "Desconto em exames e medicamentos",
          ]}
          isChecked={selectedPlan === "Básico"}
          onSelect={() => handleSelectPlan("Básico")}
        />
        <PlanCard 
          title="Premium"
          description="Seguro saúde completo, incluindo acompanhamento dedicado"
          price={planPrices["Premium"]}
          features={[
            "Consultas periódicas",
            "Acompanhamento nutricional",
            "Acompanhamento psicológico",
            "Medicamentos gratuitos",
          ]}
          isChecked={selectedPlan === "Premium"}
          onSelect={() => handleSelectPlan("Premium")}
        />
        <Button title="Continuar" disabled={selectedPlan === ""} onClick={handleContinue} />
      </div>
    </Modal>
  );
}