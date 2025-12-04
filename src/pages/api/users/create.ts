import type { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "../../../lib/firebaseAdmin"; 
import { Usuario } from "../../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  try {
   
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Token não fornecido ou inválido." });
    }
    const idToken = authorization.split("Bearer ")[1];

    
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

   
    const data = req.body;

    
    const novoUsuario: Usuario = {
      id: uid,
      nome: data.nome,
      email: data.email,
      ra: data.ra || null,
      curso: data.curso || null,
      periodo: data.periodo ? Number(data.periodo) : null,
      idade: data.idade ? Number(data.idade) : null,
      setor: data.setor || null, 
      horasTotais: 0, 
      role: "voluntario",
      createdAt: new Date().toISOString(),
    };

    
    await db.collection("users").doc(uid).set(novoUsuario);

    
    await auth.setCustomUserClaims(uid, { role: "voluntario" });

    return res.status(201).json({ success: true, userId: uid });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    return res
      .status(500)
      .json({ error: "Erro interno", details: error.message });
  }
};
