"use client"
import { createContext, useState, ReactNode } from "react";

interface OrderContextData {
  children: ReactNode;
}

interface OrderContextValue {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  birthday: string;
  setBirthday: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  weight: number | undefined;
  setWeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  parsePrice: (price: string) => number;
  formatPrice: (value: number) => string;
}

const OrderContext = createContext<OrderContextValue>({} as OrderContextValue);

const OrderProvider = ({ children }: OrderContextData) => {
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [destination, setDestination] = useState<string>("");
  const [price, setPrice] = useState<string>("R$ 0.00");

  function parsePrice(price: string): number {
    const units: { [key: string]: number } = { 'K': 1e3, 'M': 1e6, 'B': 1e9 };
    const match = price.match(/R\$\s*(\d+(?:\.\d+)?)([KMB]?)/);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2] || '';
      return value * (units[unit] || 1);
    }
    return 0;
  }

  function formatPrice(value: number): string {
    const units = ['K', 'M', 'B'];
    for (let i = units.length - 1; i >= 0; i--) {
      const unitValue = Math.pow(10, (i + 1) * 3);
      if (value >= unitValue) {
        return `R$ ${(value / unitValue).toFixed(2)}${units[i]}`;
      }
    }
    return `R$ ${value.toFixed(2)}`;
  }

  const value: OrderContextValue = {
    name,
    setName,
    birthday,
    setBirthday,
    gender,
    setGender,
    weight,
    setWeight,
    destination,
    setDestination,
    price,
    setPrice,
    parsePrice,
    formatPrice,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };