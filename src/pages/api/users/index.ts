import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseAdmin";
import { Usuario } from "../../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const snapshot = await db.collection("users").get();
      const usuarios = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      } as Usuario));
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { uid, dadosAtualizados } = req.body;

      if (!uid || !dadosAtualizados) {
        return res.status(400).json({ error: "UID e dados são necessários" });
      }

      await db.collection("users").doc(uid).update(dadosAtualizados);

      return res
        .status(200)
        .json({ success: true, message: "Perfil atualizado" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).end();
};
