"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, KeyRound, IdCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient"; 
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";

export default function LoginForm() {
    const router = useRouter();
    const [loginState, setLoginState] = useState(0); 
    const [loading, setLoading] = useState(false);

    async function handleAuth(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const ra = formData.get("ra") as string;

        try {
            if (loginState === 0) {
               
                await signInWithEmailAndPassword(auth, email, password);
                router.push("/");
            } else {
                
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                
                const token = await user.getIdToken();

                
                const response = await fetch("/api/users/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        nome: email.split("@")[0], 
                        
                        email: email,
                        ra: ra,
                        role: "voluntario" 
                    })
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    router.push("/");
                } else {
                    throw new Error("Erro ao salvar dados no banco.");
                }
            }
        } catch (error: any) {
            console.error("Erro:", error);
            alert("Erro: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    function buttonColor(value: number) {
        setLoginState(value);
    }

    return (
        <form
            onSubmit={handleAuth}
            className="flex flex-col items-center justify-start gap-4 w-full p-8 h-full bg-zinc-100 rounded-t-lg md:rounded-lg"
        >
        
            <div className="w-full flex">
                <button
                    type="button"
                    onClick={() => buttonColor(0)}
                    className={`w-1/2 text-3xl ${loginState === 0 ? "text-[#211f45]" : "text-zinc-500"} font-bold text-left hover:cursor-pointer`}
                >
                    <p>LOGIN</p>
                    <div className={`w-full h-1 ${loginState === 0 ? "bg-[#211f45]" : "bg-zinc-500"} rounded-l-lg`}></div>
                </button>

                <button
                    type="button"
                    onClick={() => buttonColor(1)}
                    className={`w-1/2 text-3xl ${loginState === 1 ? "text-[#211f45]" : "text-zinc-500"} font-bold text-right hover:cursor-pointer`}
                >
                    <p>SIGNIN</p>
                    <div className={`w-full h-1 ${loginState === 1 ? "bg-[#211f45]" : "bg-zinc-500"} rounded-r-lg`}></div>
                </button>
            </div>

            <p className="text-[#211f45] text-center flex-1">
                {loginState === 0
                    ? "Acesse utilizando seu e-mail."
                    : "Crie sua conta para acessar o sistema."}
            </p>

                        
            <div className="w-full flex item gap-4 p-4 py-2 rounded-lg text-[#211f45] border-2 border-[#211f45]">
                <User />
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="E-mail"
                    className="flex-1 bg-transparent outline-none placeholder-zinc-500"
                />
            </div>

          
            {loginState === 1 && (
                <div className="w-full flex item-center gap-4 p-4 py-2 rounded-lg text-[#211f45] border-2 border-[#211f45]">
                    <IdCard />
                    <input
                        name="ra"
                        type="text"
                        required
                        placeholder="RA"
                        className="flex-1 bg-transparent outline-none placeholder-zinc-500"
                    />
                </div>
            )}

            
            <div className="w-full flex item-center gap-4 p-4 py-2 rounded-lg text-[#211f45] border-2 border-[#211f45]">
                <KeyRound />
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Senha"
                    className="flex-1 bg-transparent outline-none placeholder-zinc-500"
                />
            </div>

            <button
                id="logar"
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-[#211f45] text-zinc-200 py-4 rounded-lg text-2xl font-bold hover:opacity-90 disabled:opacity-50"
            >
                {loading ? "Carregando..." : (loginState === 0 ? "ENTRAR" : "CADASTRAR")}
            </button>
        </form>
    );
}