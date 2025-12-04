import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { Reuniao } from '@/types';

export default async function manipulador(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    try {
      const instantaneo = await db.collection('meetings').get();
      const listaReunioes = instantaneo.docs.map(doc => {
        const dados = doc.data();
        return {
          id: doc.id,
          setor: dados.setor || "Geral",
          titulo: dados.titulo,
          tema: dados.tema,
          data: dados.data, 
          descricao: dados.descricao,
          link: dados.link || "#",
          participantes: dados.participantes || [] 
        } as Reuniao;
      });
      return res.json(listaReunioes);
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao buscar reuniões' });
    }
  }

  if (req.method === 'POST') {
    const { titulo, tema, data, descricao, link, setor, cargaHoraria } = req.body as Reuniao;
    
    await db.collection('meetings').add({
      titulo,
      tema,
      data,
      descricao,
      link,
      setor,
      cargaHoraria: Number(cargaHoraria) || 0,
      participantes: [] 
    });
    
    return res.status(201).json({ mensagem: 'Reunião criada!' });
  }
}