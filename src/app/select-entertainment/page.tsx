"use client"
import Modal from "@/components/modal";
import { OrderContext } from "@/context/order";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import PlanCard from "@/components/PlanCard";
import Button from "@/components/Button";

export default function SelectEntertainment() {
  const router = useRouter();
  const { price, setPrice, destination, parsePrice, formatPrice, entertainment, setEntertainment, planPrice } = useContext(OrderContext);
  const [selectedPlan, setSelectedPlan] = useState(entertainment);

  const planPrices: { [key in "Básico" | "Premium"]: string } = planPrice("entertainment")

  const handleSelectPlan = (plan: "Básico" | "Premium") => {
    if (plan === selectedPlan) return; // Exit if the selected plan hasn't changed

    const days = destination.toLowerCase() === "titan" ? 14 * 365 : 6;
    const newTotalPrice = parsePrice(planPrices[plan]) * days;

    // Adjust the total price based on the new plan selection
    setPrice(prevPrice => {
      const prevTotalPrice = selectedPlan ? parsePrice(planPrices[selectedPlan as "Básico" | "Premium"]) * days : 0;
      const adjustedPrice = parsePrice(prevPrice) - prevTotalPrice + newTotalPrice;
      return formatPrice(adjustedPrice);
    });

    // Update the state to reflect the new plan selection
    setSelectedPlan(plan);
    setEntertainment(plan);
  };

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push('/select-room');
  }

  return (
    <Modal>
      <Header title="Escolha o pacote de entretenimento" price={price} />
      <div className="flex flex-col gap-5">
        {["Básico", "Premium"].map((plan) => (
          <PlanCard
            key={plan}
            title={plan}
            description={plan === "Básico" ? "O essencial para matar o tempo e manter a sanidade mental" : "Diversão garantida para todas as idades"}
            price={planPrices[plan as "Básico" | "Premium"]}
            features={plan === "Básico" ? ["Academia", "Livros", "Jogos digitais e tabuleiro", "Biblioteca de filmes e séries"] : ["Cassinos", "Show futurísticos", "Jogos de realidade virtual", "Simuladores de esportes"]}
            isChecked={selectedPlan === plan}
            onSelect={() => handleSelectPlan(plan as "Básico" | "Premium")}
          />
        ))}
        <Button title="Continuar" disabled={!selectedPlan} onClick={handleContinue} />
      </div>
    </Modal>
  );
}