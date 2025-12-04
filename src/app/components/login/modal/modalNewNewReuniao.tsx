"use client";

import { useState } from "react";
import { Reuniao } from "@/types";

interface ModalNewReuniaoProps {
  modalOpen: boolean;
  handleModal: () => void;
  onSave: (r: Reuniao) => void;
}

export default function ModalNewReuniao({ modalOpen, handleModal, onSave }: ModalNewReuniaoProps) {
  const [titulo, setTitulo] = useState("");
  const [tema, setTema] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [participantes, setParticipantes] = useState("");

  const salvar = () => {
    const nova: Reuniao = {
      id: String(Date.now()),
      setor: "material",
      titulo,
      tema,
      data,
      descricao,
      link,
      participantes: participantes.split(",").map(p => p.trim())
    };

    onSave(nova);
    handleModal();
  };

  return (
    <div className={`bg-[#222222cc] inset-0 fixed z-10 p-12 py-24 ${modalOpen ? "flex" : "hidden"} items-center justify-center`}>
      <div className="w-full md:w-1/2 h-full p-10 bg-zinc-200 rounded-lg flex flex-col gap-4 relative">

        <button
          onClick={handleModal}
          className="p-2 px-4 rounded-lg absolute right-2 top-2 bg-(--mainCl) text-zinc-200"
        >
          x
        </button>

        <h1 className="text-xl font-bold text-(--mainCl)">Nova Reunião</h1>

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <input
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Tema"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <input
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link da Reunião"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          className="w-full p-3 h-28 rounded bg-zinc-300 text-(--mainCl)"
        />

        <input
          value={participantes}
          onChange={(e) => setParticipantes(e.target.value)}
          placeholder="Participantes separados por vírgula"
          className="w-full p-3 rounded bg-zinc-300 text-(--mainCl)"
        />

        <button
          onClick={salvar}
          className="bg-(--mainCl) text-zinc-200 px-4 py-3 rounded font-bold hover:bg-zinc-200 hover:text-(--mainCl)"
        >
          Salvar
        </button>

      </div>
    </div>
  );
}
