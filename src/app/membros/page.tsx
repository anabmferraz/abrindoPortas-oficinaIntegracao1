"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import Header from "@/app/components/header/header";
import FooterMbl from "@/app/components/header/footerMbl";
import { Usuario } from "@/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Membros() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [membros, setMembros] = useState<Usuario[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push("/login");
            } else {
                try {
                    const response = await fetch('/api/users');
                    if (response.ok) {
                        const data = await response.json();
                        setMembros(data);
                    }
                } catch (error) {
                    console.error('Erro ao carregar membros:', error);
                }
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const downloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        doc.setFontSize(18);
        doc.setTextColor(40, 40, 40);
        doc.text('Lista de Membros - Abrindo Portas', 14, 20);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        doc.text(`Gerado em: ${dataAtual}`, 14, 27);

        const tableData = membros.map(membro => [
            membro.nome || 'Não informado',
            membro.email || 'Não informado',
            membro.ra || '-',
            membro.cpf || '-',
            membro.setor || 'Sem setor',
            membro.horasTotais ? `${membro.horasTotais}h` : '0h'
        ]);

        autoTable(doc, {
            head: [['Nome', 'Email', 'RA', 'CPF', 'Setor', 'Horas']],
            body: tableData,
            startY: 35,
            theme: 'striped',
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold',
                halign: 'left'
            },
            styles: {
                fontSize: 9,
                cellPadding: 3
            },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 60 },
                2: { cellWidth: 25 },
                3: { cellWidth: 30 },
                4: { cellWidth: 35 },
                5: { cellWidth: 20, halign: 'center' }
            }
        });

        doc.save('membros_abrindoportas.pdf');
    };

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
                MEMBROS
            </div>

            <div className="flex-1 p-6 md:p-16">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <p className="text-(--mainCl) text-lg font-bold">
                            {membros.length} {membros.length === 1 ? 'membro cadastrado' : 'membros cadastrados'}
                        </p>
                        
                        {membros.length > 0 && (
                            <button
                                onClick={downloadPDF}
                                className="flex items-center gap-2 px-6 py-3 bg-(--mainCl) text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                    />
                                </svg>
                                Baixar PDF
                            </button>
                        )}
                    </div>

                    {membros.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <p className="text-(--mainCl) text-xl">
                                Nenhum membro cadastrado ainda.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-(--mainCl) text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Nome</th>
                                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">RA</th>
                                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">CPF</th>
                                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Setor</th>
                                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Horas</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {membros.map((membro, index) => (
                                            <tr 
                                                key={membro.id || `membro-${index}`}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-sm text-(--mainCl) font-medium">
                                                    {membro.nome || 'Não informado'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {membro.email || 'Não informado'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {membro.ra || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {membro.cpf || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-(--mainCl) text-white capitalize">
                                                        {membro.setor || 'Sem setor'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-bold">
                                                    {membro.horasTotais ? `${membro.horasTotais}h` : '0h'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FooterMbl />
        </div>
    );
}
