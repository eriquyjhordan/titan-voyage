import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Modal from "@/components/modal";

export default function Home() {
  return (
    <Modal>
      <Header />
      <Input label="Seu nome" placeholder="Insira seu nome completo" />
      <Select 
       label="Gênero"
        options={[
          { value: "masculino", label: "Masculino" },
          { value: "feminino", label: "Feminino" },
          { value: "outro", label: "Outro" },
        ]}
      />
      <Button title="Continuar" />
    </Modal>
  );
}