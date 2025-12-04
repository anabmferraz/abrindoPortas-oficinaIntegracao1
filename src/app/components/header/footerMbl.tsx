import {SquareUserRound, Menu, UsersRound, Settings} from "lucide-react"
import Link from "next/link"

export default function FooterMbl () {
    return(
        <div className="bg-(--mainCl) h-24 px-6 py-4 flex items-center justify-between text-zinc-200) md:hidden">
            <button
                type="button"
                id="btnMenu"
                title="btnMenu"
                className="w-full h-full flex items-center justify-center"
                >
                    <Menu 
                    size={36}
                    />
            </button>
            <button
                type="button"
                id="btnMembers"
                title="btnMembers"
                className="w-full h-full flex items-center justify-center"
                >
                    <UsersRound 
                    size={36}
                    />
            </button>
            <Link href="/setores" className="w-full">
                <button
                    type="button"
                    id="btnPerfil"
                    title="btnPerfil"
                    className="w-full h-full flex items-center justify-center"
                    >
                        <SquareUserRound 
                        size={36}
                        />
                </button>
            </Link>
            <button
                type="button"
                id="btnConfig"
                title="btnConfig"
                className="w-full h-full flex items-center justify-center"
                >
                    <Settings 
                    size={36}
                    />
            </button>
        </div>
    )
}