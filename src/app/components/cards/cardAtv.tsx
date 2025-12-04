'use client'

import {useState} from "react"
import {Paperclip} from "lucide-react"
import { Atividade } from "@/types"

interface CardItemProps {
    atividade: Atividade;
}

export default function CardAtv({ atividade }: CardItemProps) {

    const [troggleActv, setTroggleActv] = useState(false)
    

    const handleTroggleActv = () => {
        setTroggleActv(!troggleActv)
    }

    return(
        <div
        onClick={() => handleTroggleActv()}
        className="w-full mt-4">
            <div className={`w-full overflow-hidden flex flex-col border-(--mainCl) border-2 rounded-lg ${troggleActv ? 'bg-(--mainCl) text-zinc-300' : 'bg-zinc-200 text-(--mainCl)'}`}>
                <div className="w-full px-4 py-1 h-16 flex flex-col">
                    <p className="font-bold text-[1.2rem] flex-1 text-left">{atividade.titulo}</p>
                    <div className="flex justify-between">
                        <p>{atividade.tema}</p>
                        <p>Entrega: {atividade.entrega}</p>
                    </div>
                </div>
                {troggleActv && (
                    <div className="bg-zinc-200 w-full py-2 flex flex-col gap-4 text-(--mainCl) p-4">
                        <p className="font-bold text-justify">
                        Descrição: <span className="font-medium">{atividade.descricao}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}