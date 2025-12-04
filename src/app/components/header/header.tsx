import Link from "next/link"

export default function Header (){
    return(
        <div className="hidden md:flex items-center justify-end p-8 py-2 bg-(--mainCl) gap-4 font-bold text-sm text-zinc-200">
            <Link href={"/"}> SETORES </Link>
            <Link href={"/perfil"}> PERFIL </Link>
            <Link href={"/membros"}> MEMBROS </Link>
            <Link href={"/login"}> SAIR </Link>
        </div>
    )
}