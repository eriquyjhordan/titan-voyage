"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [disable, setDisable] = useState<boolean>(true);
  const [weight, setWeight] = useState<number>();

  const [nameError, setNameError] = useState<string>('');
  const [birthDateError, setBirthDateError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [weightError, setWeightError] = useState<string>('');

  function handleBirthDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const date = value.replace(/\D/g, '').slice(0, 8);
    let dateArray = date.split('');
    if (dateArray.length > 2) {
      dateArray.splice(2, 0, '/');
    }
    if (dateArray.length > 5) {
      dateArray.splice(5, 0, '/');
    }
    const formattedDate = dateArray.join('');
    setBirthDate(formattedDate);
  }

  function isValidDate(dateString: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateString.match(regex)) return false;
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
  }

  function validateName() {
    const hasFirstNameAndLastName = name.trim().split(' ').length >= 2;
    setNameError(hasFirstNameAndLastName ? '' : 'Por favor, insira seu nome completo.');
  }

  function validateBirthDate() {
    setBirthDateError(isValidDate(birthDate) ? '' : 'Data de nascimento inválida.');
  }

  function validateGender() {
    setGenderError(gender !== '' ? '' : 'Por favor, selecione um gênero.');
  }

  function validateWeight() {
    setWeightError(weight && weight > 0 ? '' : 'Por favor, insira um peso válido.');
  }

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push('/select-destination');
  }

  useEffect(() => {
    const hasFirstNameAndLastName = name.trim().split(' ').length >= 2;
    const isFormValid = hasFirstNameAndLastName && isValidDate(birthDate) && gender !== '' && weight && weight > 0;
    setDisable(!isFormValid);
  }, [name, birthDate, gender, weight]);

  return (
    <Modal>
      <Header />
      <div className="flex flex-col gap-6 my-10 mb-20">
        <Input
          label="Seu nome"
          placeholder="Insira seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validateName}
        />
        {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
        
        <Input
          label="Data de nascimento"
          placeholder="dd/mm/yyyy"
          onChange={handleBirthDateChange}
          value={birthDate}
          type="tel"
          onBlur={validateBirthDate}
        />
        {birthDateError && <span className="text-red-500 text-sm">{birthDateError}</span>}
        
        <Select
          label="Gênero"
          options={[
            { value: "masculino", label: "Masculino" },
            { value: "feminino", label: "Feminino" },
            { value: "outro", label: "Outro" },
          ]}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          onBlur={validateGender}
        />
        {genderError && <span className="text-red-500 text-sm">{genderError}</span>}
        
        <Input
          label="Peso em kg"
          placeholder="Insira seu peso"
          type="tel"
          value={weight}
          onChange={(e) => setWeight(e.target.value === '' ? undefined : Number(e.target.value))}
          onBlur={validateWeight}
        />
        {weightError && <span className="text-red-500 text-sm">{weightError}</span>}
      </div>
      <Button 
        title="Continuar" 
        disabled={disable}
        onClick={handleContinue}
       />
    </Modal>
  );
}