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
  entertainment: string;
  setEntertainment: React.Dispatch<React.SetStateAction<string>>;
  meal: string;
  setMeal: React.Dispatch<React.SetStateAction<string>>;
  health: string;
  setHealth: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  selfcare: string;
  setSelfcare: React.Dispatch<React.SetStateAction<string>>;
  planPrice: (category: string) => { [key in "Básico" | "Premium"]: string };
}

const OrderContext = createContext<OrderContextValue>({} as OrderContextValue);

const OrderProvider = ({ children }: OrderContextData) => {
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [destination, setDestination] = useState<string>("");
  const [price, setPrice] = useState<string>("R$ 0.00");
  const [entertainment, setEntertainment] = useState<string>("");
  const [meal, setMeal] = useState<string>("");
  const [health, setHealth] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [selfcare, setSelfcare] = useState<string>("");


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

  function planPrice(category: string) {
    switch (category) {
      case 'entertainment':
        return { 'Básico': "R$ 1M", "Premium": "R$ 2M"}
      case 'meal':
        return { 'Básico': "R$ 1M" , "Premium":"R$ 2M"}
      case 'health':
        return { 'Básico': "R$ 2M", "Premium": "R$ 3M"}
      case 'room':
      case 'selfcare':
        return { 'Básico': "R$ 1M", "Premium": "R$ 3M"}
      default:
        return { 'Básico': "R$ 0.00", "Premium": "R$ 0.00" }
    }
  }

  console.log({
    room,
    health,
    meal,
    entertainment,
    selfcare
  })

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
    entertainment,
    setEntertainment,
    meal,
    setMeal,
    health,
    setHealth,
    room,
    setRoom,
    selfcare,
    setSelfcare,
    planPrice
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };