"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import Header from "@/app/components/header/header";
import FooterMbl from "@/app/components/header/footerMbl";

export default function Perfil() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push("/login");
            } else {
                setUser(currentUser);
                
                try {
                    const token = await currentUser.getIdToken();
                    const response = await fetch('/api/users/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                    }
                } catch (error) {
                    console.error('Erro ao carregar dados do usuário:', error);
                }
                
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-2xl text-(--mainCl)">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-100 w-full min-h-dvh flex flex-col text-zinc-200">
            <Header />
            
            <div className="gradient-bg flex items-center py-4 px-6 text-4xl font-bold">
                MEU PERFIL
            </div>

            <div className="flex-1 p-6 md:p-16">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    
                    
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                            <div className="w-20 h-20 rounded-full bg-(--mainCl) flex items-center justify-center text-white text-3xl font-bold">
                                {user?.email?.[0].toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-(--mainCl)">
                                    {userData?.nome || user?.email?.split('@')[0] || 'Usuário'}
                                </h1>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                        </div>

                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <p className="text-(--mainCl) bg-gray-100 p-3 rounded">
                                    {user?.email || 'Não informado'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    RA
                                </label>
                                <p className="text-(--mainCl) bg-gray-100 p-3 rounded">
                                    {userData?.ra || 'Não informado'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Setor
                                </label>
                                <p className="text-(--mainCl) bg-gray-100 p-3 rounded capitalize">
                                    {userData?.setor || 'Não atribuído'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cargo
                                </label>
                                <p className="text-(--mainCl) bg-gray-100 p-3 rounded capitalize">
                                    {userData?.role || 'Não informado'}
                                </p>
                            </div>

                            {userData?.curso && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Curso
                                    </label>
                                    <p className="text-(--mainCl) bg-gray-100 p-3 rounded">
                                        {userData.curso}
                                    </p>
                                </div>
                            )}

                            {userData?.periodo && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Período
                                    </label>
                                    <p className="text-(--mainCl) bg-gray-100 p-3 rounded">
                                        {userData.periodo}º período
                                    </p>
                                </div>
                            )}
                        </div>

                        
                        {userData?.sobre && (
                            <div className="pt-6 border-t border-gray-200">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sobre
                                </label>
                                <p className="text-(--mainCl) bg-gray-100 p-4 rounded">
                                    {userData.sobre}
                                </p>
                            </div>
                        )}

                        
                        <div className="pt-6 border-t border-gray-200">
                            <button
                                onClick={() => alert('Função de editar em desenvolvimento')}
                                className="w-full md:w-auto bg-(--mainCl) text-white px-6 py-3 rounded-lg font-bold hover:opacity-90"
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <FooterMbl />
        </div>
    );
}