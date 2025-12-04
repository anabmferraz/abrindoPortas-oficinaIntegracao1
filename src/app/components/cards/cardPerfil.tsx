'use client'

import { Perfil } from "@/types"
import { useState, useEffect } from "react"
import Image from 'next/image'
import { handleModalPfl } from "../login/modal/handleModalPfl"


interface CardPerfilProps {
  perfil: Perfil;
}

export default function CardPerfil({ perfil }: CardPerfilProps) {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => handleModalPfl(modalOpen, setModalOpen)}
        className="w-[46%] h-52 md:h-72 px-4 py-2 flex flex-col items-center border-(--mainCl) border-2 rounded-lg bg-(--mainCl) text-zinc-300 md:w-48 md:p-4 cursor-pointer"
      >
        <div className="w-22 h-22 rounded-full overflow-hidden border-2 border-zinc-300 md:w-32 md:h-32 relative bg-gray-200 flex items-center justify-center">
          {perfil.foto ? (
            <Image
              src={perfil.foto}
              fill
              className="absolute object-cover"
              alt="Profile picture"
            />
          ) : (
            <div className="text-4xl text-gray-400">
              {perfil.nome?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>
        <p className="font-bold text-[1.2rem] text-left">{perfil.nome}</p>
        <div className="flex flex-col items-center justify-start text-center">
          <p>{perfil.setor}</p>
          <p className="font-light text-[0.8rem]">{perfil.curso}</p>
        </div>
      </div>

      
    </>
  );
}
