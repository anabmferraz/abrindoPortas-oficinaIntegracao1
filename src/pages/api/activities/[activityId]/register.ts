import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { Participante } from '@/types'; 

export default async function manipulador(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Método não permitido');
  }

  try {
    const { activityId } = req.query; 
    
    const { idUsuario, nomeUsuario, horasRegistradas } = req.body as Participante;

    if (!idUsuario || !nomeUsuario) {
      return res.status(400).json({ erro: 'Dados incompletos (idUsuario e nomeUsuario são obrigatórios).' });
    }

    const horas = Number(horasRegistradas) || 0;

    await db
      .collection('activities')
      .doc(activityId as string)
      .collection('participants')
      .doc(idUsuario) 
      .set({
        idUsuario,
        nomeUsuario,
        horasRegistradas: horas,
        dataRegistro: new Date().toISOString()
      });

    

    return res.status(200).json({ sucesso: true, mensagem: 'Participação registrada com sucesso!' });

  } catch (erro: any) {
    return res.status(500).json({ erro: 'Erro ao registrar participação', detalhes: erro.message });
  }
}