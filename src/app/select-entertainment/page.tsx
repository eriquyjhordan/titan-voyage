"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import PlanCard from "@/components/PlanCard";
import Modal from "@/components/modal";
import { OrderContext } from "@/context/order";
import { useContext, useState } from "react";

export default function SelectEntertainment() {
  const { price, setPrice, destination, parsePrice, formatPrice } = useContext(OrderContext);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handleSelectPlan = (plan: string) => {
    const dailyPrice = plan === "Básico" ? "R$ 38" : "R$ 68.50";
    const dailyPriceValue = parsePrice(dailyPrice);
    const days = destination.toLowerCase() === "titan" ? 14 * 365 : 6;
    const totalPrice = dailyPriceValue * days;

    setPrice((prevPrice) => {
      let prevPriceValue = parsePrice(prevPrice);

      if (selectedPlan && selectedPlan !== plan) {
        const previousPlanPrice = selectedPlan === 'Básico' ? "R$ 38" : "R$ 68.50";
        const previousPlanValue = parsePrice(previousPlanPrice);
        const previousTotalPrice = previousPlanValue * days;
        prevPriceValue -= previousTotalPrice;
      }

      if (selectedPlan === plan) {
        return prevPrice;
      }

      const newPriceValue = prevPriceValue + totalPrice;
      return formatPrice(newPriceValue);
    });

    setSelectedPlan(plan);
  };

  return (
    <Modal>
      <Header 
        title="Escolha o pacote de entretenimento"
        price={price}
      />
      <div className="flex flex-col gap-5">
        <PlanCard 
          title="Básico"
          description="O essencial para matar o tempo e manter a sanidade mental"
          price="R$ 38"
          features={[
            "Academia",
            "Livros",
            "Jogos digitais e tabuleiro",
            "Biblioteca de filmes e séries"
          ]}
          isChecked={selectedPlan === "Básico"}
          onSelect={() => handleSelectPlan("Básico")}
        />
        <PlanCard 
          title="Premium"
          description="Diversão garantida para todas as idades"
          price="R$ 68.50"
          features={[
            "Cassinos",
            "Show futurísticos",
            "Jogos de realidade virtual",
            "Simuladores de esportes",
          ]}
          isChecked={selectedPlan === "Premium"}
          onSelect={() => handleSelectPlan("Premium")}
        />
        <Button title="Continuar" disabled={selectedPlan === "" }  />
      </div>
    </Modal>
  );
}