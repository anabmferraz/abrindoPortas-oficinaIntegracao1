"use client";

import { useState } from "react";
import { Atividade } from "@/types";

interface ModalNewAtvProps {
  modalOpen: boolean;
  handleModal: () => void;
  onSave: (atv: Atividade) => void;
}

export default function ModalNewAtv({ modalOpen, handleModal, onSave }: ModalNewAtvProps) {

  const [nomeAtv, setNomeAtv] = useState("");
  const [temaAtv, setTemaAtv] = useState("");
  const [setorAtv, setSetorAtv] = useState("material"); // Setor com valor padrão
  const [dataAtv, setDataAtv] = useState("");
  const [descAtv, setDescAtv] = useState("");

  const salvarAtividade = () => {

    const novaAtv: Atividade = {
      id: String(Date.now()),
      setor: setorAtv, 
      titulo: nomeAtv,
      tema: temaAtv,
      entrega: dataAtv,
      descricao: descAtv
    };

    onSave(novaAtv);
    handleModal();
    
   
    setNomeAtv("");
    setTemaAtv("");
    setSetorAtv("material");
    setDataAtv("");
    setDescAtv("");
  };

  return (
    <div className={`bg-[#222222cc] inset-0 fixed z-10 p-12 py-24 ${modalOpen ? "flex" : "hidden"} items-center justify-center`}>
      <div className="w-full md:w-1/2 h-full p-10 bg-zinc-200 rounded-lg flex flex-col gap-4 relative overflow-y-auto">

        <button
          onClick={handleModal}
          className="p-2 px-4 rounded-lg absolute right-2 top-2 bg-(--mainCl) text-zinc-200"
        >
          x
        </button>

        <h1 className="text-xl font-bold text-(--mainCl)">Nova Atividade</h1>

        <input
          value={nomeAtv}
          onChange={(e) => setNomeAtv(e.target.value)}
          placeholder="Nome da Atividade"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <input
          value={temaAtv}
          onChange={(e) => setTemaAtv(e.target.value)}
          placeholder="Tema"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <select
          value={setorAtv}
          onChange={(e) => setSetorAtv(e.target.value)}
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        >
          <option value="apostila">Apostila</option>
          <option value="coordenacao">Coordenaçãos</option>
          <option value="instrutores">Instrutores</option>
          <option value="material">Material</option>
          <option value="marketing">Marketing</option>
        </select>

        <input
          type="text"
          value={dataAtv}
          onChange={(e) => setDataAtv(e.target.value)}
          placeholder="Data de Entrega"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <textarea
          value={descAtv}
          onChange={(e) => setDescAtv(e.target.value)}
          placeholder="Descrição"
          className="w-full p-3 h-32 rounded bg-zinc-300 text-(--mainCl)"
        />

        <button
          onClick={salvarAtividade}
          className="bg-(--mainCl) text-zinc-200 px-4 py-3 rounded font-bold hover:bg-zinc-200 hover:text-(--mainCl)"
        >
          Salvar
        </button>

      </div>
    </div>
  );
}
