"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import PlanCard from "@/components/PlanCard";
import Modal from "@/components/modal";
import { OrderContext } from "@/context/order";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectSelfcare() {
  const router = useRouter();
  const { price, setPrice, destination, parsePrice, formatPrice, selfcare, setSelfcare, planPrice } = useContext(OrderContext);
  const [selectedPlan, setSelectedPlan] = useState<string>(selfcare);

  const planPrices: { [key in "Básico" | "Premium"]: string } = planPrice("selfcare");

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
    setSelfcare(plan);
  };

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push('/resume');
  }

  return (
    <Modal>
      <Header 
        title="Escolha o pacote de cuidados pessoais"
        price={price}
      />
      <div className="flex flex-col gap-5">
        <PlanCard 
          title="Básico"
          description="Itens essenciais para sua estadia"
          price={planPrices["Básico"]}
          features={[
            "Kit de primeiros socorros",
            "Kit de higiene", 
            "Kit Capilar",
          ]}
          isChecked={selectedPlan === "Básico"}
          onSelect={() => handleSelectPlan("Básico")}
        />
        <PlanCard 
          title="Premium"
          description="Relaxe e cuide de si mesmo"
          price={planPrices["Premium"]}
          features={[
            "Spa",
            "Cabeleireiro",
            "Manicure",
          ]}
          isChecked={selectedPlan === "Premium"}
          onSelect={() => handleSelectPlan("Premium")}
        />
        <Button title="Continuar" disabled={selectedPlan === ""} onClick={handleContinue} />
      </div>
    </Modal>
  );
}