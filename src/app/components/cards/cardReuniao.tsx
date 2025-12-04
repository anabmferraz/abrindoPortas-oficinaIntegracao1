'use client'

import {useState} from "react"
import {ChevronRight} from "lucide-react"
import { Reuniao } from "@/types"
import Link from "next/link"

interface CardItemProps {
    reuniao: Reuniao;
}

export default function CardReuniao({ reuniao }: CardItemProps) {

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
                    <p className="font-bold text-[1.2rem] flex-1 text-left">{reuniao.titulo}</p>
                    <div className="flex justify-between">
                        <p>{reuniao.tema}</p>
                        <p>Entrega: {reuniao.data}</p>
                    </div>
                </div>
                {troggleActv && (
                    <div className="bg-zinc-300 w-full py-2 flex flex-col gap-2 text-(--mainCl) p-4">
                        <p className="font-bold text-justify">
                        Descrição: <span className="font-medium">{reuniao.descricao}</span>
                        </p>
                        <p className="font-bold text-justify">
                            Participantes: {reuniao.participantes?.join(', ')}
                        </p>
                        {reuniao.link && (
                            <Link
                                href={reuniao.link}
                                className="self-end">
                                    <button
                                    type="button"
                                    className="px-4 py-2 rounded-md bg-(--mainCl) flex gap-2 items-center justify-end text-zinc-300"
                                    >
                                        LINK REUNIÃO
                                        <ChevronRight />
                                    </button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}