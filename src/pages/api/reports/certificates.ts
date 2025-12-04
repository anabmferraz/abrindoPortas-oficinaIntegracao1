import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { IRelatorioCertificado } from '@/types';

export default async function manipulador(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const mapaRelatorio: Record<string, IRelatorioCertificado> = {};

    const usuariosSnap = await db.collection('users').get();
    usuariosSnap.forEach(doc => {
      const dados = doc.data();
      mapaRelatorio[doc.id] = {
        idUsuario: doc.id,
        nome: dados.nome || 'Sem Nome',
        ra: dados.ra || 'N/A',
        horasTotais: 0
      };
    });

    const partsSnap = await db.collectionGroup('participants').get();
    partsSnap.forEach(doc => {
      const dados = doc.data();
      const uid = dados.idUsuario;
      if (mapaRelatorio[uid]) {
        mapaRelatorio[uid].horasTotais += (Number(dados.horasRegistradas) || 1);
      }
    });

    const attendeesSnap = await db.collectionGroup('attendees').get();
    
    const reunioesSnap = await db.collection('meetings').get();
    const horasReuniao: Record<string, number> = {};
    reunioesSnap.forEach(r => horasReuniao[r.id] = r.data().cargaHoraria || 0);

    attendeesSnap.forEach(doc => {
      const uid = doc.data().idUsuario;
      const idReuniaoPai = doc.ref.parent.parent?.id;

      if (idReuniaoPai && mapaRelatorio[uid]) {
        mapaRelatorio[uid].horasTotais += (horasReuniao[idReuniaoPai] || 0);
      }
    });

    const final = Object.values(mapaRelatorio).sort((a, b) => b.horasTotais - a.horasTotais);
    return res.json(final);

  } catch (erro: any) {
    return res.status(500).json({ erro: erro.message });
  }
}