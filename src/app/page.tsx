'use client';

import { useRouter } from "next/navigation";

import Header from "@/app/components/header/header"
import FooterMbl from "@/app/components/header/footerMbl"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

import { Atividade, Reuniao } from "@/types";
import CardAtv from "@/app/components/cards/cardAtv"
import CardReuniao from "@/app/components/cards/cardReuniao";   
import CardPerfil from "@/app/components/cards/cardPerfil";

import ModalNewAtv from "@/app/components/login/modal/modalNewAtv";
import ModalNewReuniao from "@/app/components/login/modal/modalNewNewReuniao";

export default function Main() {
    
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [atividades, setAtividades] = useState<Atividade[]>([])
    const [reunioes, setReunioes] = useState<Reuniao[]>([])
    const [perfils, setPerfils] = useState<any[]>([])    
    const [modalOpen, setModalOpen] = useState(false);
    const [modalRn, setModalRn] = useState(false);

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/login");
            } else {
                setUser(currentUser);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        
        if (!user) return;
        
        async function fetchDados() {
            try {
                const response = await fetch('/api/activities');
                if (response.ok) {
                    const dataAtv = await response.json();
                    setAtividades(dataAtv);
                } else {
                    console.error('Erro ao buscar atividades:', response.statusText);
                }
                
                const responseUsers = await fetch('/api/users');
                if (responseUsers.ok) {
                    const dataUsers = await responseUsers.json();
                    setPerfils(dataUsers);
                } else {
                    console.error('Erro ao buscar usuarios:', responseUsers.statusText);
                }
            } catch (erro) {
                console.error('Erro ao buscar dados:', erro);
            }
        }
        fetchDados();

    }, [user])


    const handleModal = () => setModalOpen(!modalOpen);

    const handleModalRn = () => setModalRn(!modalRn);

    const salvarNovaAtv = async (novaAtv: Atividade) => {
        try {
            const response = await fetch('/api/activities', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaAtv) 
            });

            if (response.ok) {
                const data = await response.json();
                setAtividades((prev) => [...prev, { ...novaAtv, id: data.id }]);
                console.log('Atividade criada com sucesso!', data);
            } else {
                const error = await response.json();
                console.error('Erro ao criar atividade:', error);
                alert('Erro ao criar atividade: ' + (error.erro || 'Erro desconhecido'));
            }
        } catch (erro) {
            console.error('Erro de rede ao criar atividade:', erro);
            alert('Erro de conexão. Verifique sua internet e tente novamente.');
        }
    };

    const salvarReuniao = async (nova: Reuniao) => {
        try {
            const response = await fetch('/api/meetings', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nova) 
            });

            if (response.ok) {
                const data = await response.json();
                setReunioes((prev) => [...prev, nova]);
                console.log('Reunião criada com sucesso!', data);
            } else {
                const error = await response.json();
                console.error('Erro ao criar reunião:', error);
                alert('Erro ao criar reunião: ' + (error.erro || 'Erro desconhecido'));
            }
        } catch (erro) {
            console.error(' Erro de rede ao criar reunião:', erro);
            alert('Erro de conexão. Verifique sua internet e tente novamente.');
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-2xl text-(--mainCl)">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-100 w-full h-dvh md:max-h-dvh flex flex-col justify-end md:justify-start text-zinc-200">
            <Header/>
            <div className="gradient-bg flex items-center py-4 px-6 text-4xl font-bold sticky"> MATERIAL</div>           
            <div className="flex-1 px-6 py-10 flex flex-col gap-12 overflow-auto no-scrollbar text-(--mainCl) md:flex-row md:flex-wrap md:justify-between md:px-16 md:overflow">
                <div className="w-full md:w-3/7">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-2xl font-bold">SUAS ATIVIDADES</h1>
                        <button 
                            onClick={handleModal}
                            className="bg-(--mainCl) text-zinc-200 px-2 py-1 mt-2 border-2 border-(--mainCl) hover:bg-transparent hover:text-(--mainCL) hover:cursor-pointer"
                        >
                            Nova Atividade
                        </button>
                        <ModalNewAtv
                            modalOpen={modalOpen}
                            handleModal={handleModal}
                            onSave={salvarNovaAtv}
                        />
                    </div>
                    <div className="w-full h-0.75 bg-(--mainCl)"/>
                    <div className="w-full flex flex-col items-center gap-1">
                        {atividades.map((item) => (
                            <CardAtv 
                                key={item.id} 
                                atividade={item} 
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-3/7">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-2xl font-bold">SUAS REUNIÕES</h1>
                        <button 
                            onClick={handleModalRn}
                            className="bg-(--mainCl) text-zinc-200 px-2 py-1 mt-2 border-2 border-(--mainCl) hover:bg-transparent hover:text-(--mainCL) hover:cursor-pointer"
                        >
                            Nova Reunião
                        </button>
                        <ModalNewReuniao
                            modalOpen={modalRn}
                            handleModal={handleModalRn}
                            onSave={salvarReuniao}
                        />
                    </div>                        
                    <div className="w-full h-0.75 bg-(--mainCl)"/>
                    {reunioes.map((item) => (
                        <CardReuniao
                            key={item.id}
                            reuniao={item} 
                        />
                    ))}
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold">MEMBROS</h1>                        
                    <div className="w-full h-0.75 bg-(--mainCl)"/>
                    <div className="w-full mt-4 flex flex-wrap gap-4 items-center justify-between md:flex-nowrap md:overflow-x no-scrollbar md:min-w-full">
                        {perfils.map((item) => (
                            <CardPerfil
                                key={item.id}
                                perfil={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <FooterMbl/>
        </div>
    )
}