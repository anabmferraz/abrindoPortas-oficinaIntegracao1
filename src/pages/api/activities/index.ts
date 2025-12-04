import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/firebaseAdmin';
import { Atividade } from '@/types';

export default async function manipulador(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    try {
      const instantaneo = await db.collection('activities').get();
      
      const listaAtividades = instantaneo.docs.map(doc => {
        const dados = doc.data();
        return {
          id: doc.id,
          setor: dados.setor || "Geral",
          titulo: dados.titulo,
          tema: dados.tema,
          entrega: dados.entrega, 
          descricao: dados.descricao,
          cargaHoraria: dados.cargaHoraria
        } as Atividade;
      });

      return res.status(200).json(listaAtividades);
    } catch (erro: any) {
      return res.status(500).json({ erro: 'Erro ao buscar atividades' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { titulo, tema, entrega, descricao, setor, cargaHoraria, idRepresentante } = req.body as Atividade;

      if (!titulo || !setor) {
        return res.status(400).json({ erro: 'Titulo e Setor são obrigatórios.' });
      }

      const novaAtividade = {
        titulo,
        tema: tema || "",
        entrega: entrega || "", 
        descricao: descricao || "",
        setor,
        cargaHoraria: Number(cargaHoraria) || 0,
        idRepresentante: idRepresentante || "admin",
        criadoEm: new Date().toISOString()
      };

      const docRef = await db.collection('activities').add(novaAtividade);
      return res.status(201).json({ id: docRef.id, mensagem: 'Atividade criada!' });

    } catch (erro: any) {
      return res.status(500).json({ erro: 'Erro ao criar', detalhes: erro.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Método ${req.method} não permitido`);
}