
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  setor?: string;
  ra?: string | null;
  cpf?: string | null;
  curso?: string | null;
  periodo?: number | null;
  idade?: number | null;
  cidade?: string | null;
  sobre?: string | null;
  role: "voluntario" | "representante" | "coordenador";
  hobbies?: string[];
  horasTotais?: number;
  createdAt?: string;
}

export interface Atividade {
  id?: string;
  titulo: string;
  tema?: string;
  entrega: string;
  descricao?: string;
  setor: string;
  cargaHoraria?: number;
  idRepresentante?: string;
  criadoEm?: string;
}
export interface Reuniao {
  id?: string;
  titulo: string;
  tema?: string;
  data: string;
  descricao?: string;
  link?: string;
  setor: string;
  cargaHoraria?: number;
  participantes?: string[];
  idRepresentante?: string;
  criadoEm?: string;
}

export interface Participante {
  idUsuario: string;
  nomeUsuario: string;
  horasRegistradas?: number;
  dataRegistro?: string;
}

export interface Perfil {
  id?: string;
  nome: string;
  email?: string;
  foto: string;
  setor: string;
  curso?: string;
  sobre?: string;
}

export interface IRelatorioCertificado {
  idUsuario: string;
  nome: string;
  ra: string;
  horasTotais: number;
}
