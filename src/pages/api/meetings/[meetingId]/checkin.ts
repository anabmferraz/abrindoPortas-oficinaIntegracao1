import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import admin from 'firebase-admin';

export default async function manipulador(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).end();

  try {
    const { meetingId } = req.query;

    if (req.method === 'GET') {
      const attendeesSnap = await db.collection('meetings')
        .doc(meetingId as string)
        .collection('attendees')
        .get();

      const attendees = attendeesSnap.docs.map(doc => doc.data());
      return res.json(attendees);
    }

    
    const { idUsuario, nomeUsuario } = req.body; 

    const reuniaoRef = db.collection('meetings').doc(meetingId as string);
    
    
    const reuniaoDoc = await reuniaoRef.get();
    const reuniaoData = reuniaoDoc.data();
    const cargaHoraria = Number(reuniaoData?.cargaHoraria) || 0;

    await reuniaoRef.collection('attendees').doc(idUsuario).set({
      idUsuario,
      nomeUsuario,
      dataHoraCheckIn: new Date().toISOString()
    });

    await reuniaoRef.update({
      participantes: admin.firestore.FieldValue.arrayUnion(nomeUsuario)
    });


    return res.json({ sucesso: true });
  } catch (erro: any) {
    return res.status(500).json({ erro: erro.message });
  }
}