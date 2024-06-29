"use client"
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Modal from "@/components/modal";
import { useState } from "react";

export default function Home() {
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');

  function handleBirthDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const date = value.replace(/\D/g, '').slice(0, 8); // Remove non-digits and limit to 8 characters

    let dateArray = date.split('');

    if (dateArray.length > 2) {
      dateArray.splice(2, 0, '/');
    }
    // Insert second slash after day (5 characters: dd/mm)
    if (dateArray.length > 5) {
      dateArray.splice(5, 0, '/');
    }

    const formattedDate = dateArray.join('');

    setBirthDate(formattedDate);
  }


  return (
    <Modal>
      <Header />
      <div className="flex flex-col gap-6 my-10">
        <Input label="Seu nome" placeholder="Insira seu nome completo" />
        <Input
          label="Data de nascimento"
          placeholder="dd/mm/yyyy"
          onChange={handleBirthDateChange}
          value={birthDate}
          type="tel" // This line ensures a numeric keyboard on mobile devices
        />
        <Select
          label="Gênero"
          options={[
            { value: "masculino", label: "Masculino" },
            { value: "feminino", label: "Feminino" },
            { value: "outro", label: "Outro" },
          ]}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <Button title="Continuar" />
    </Modal>
  );
}