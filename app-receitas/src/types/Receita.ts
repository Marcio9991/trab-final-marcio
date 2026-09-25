export interface Metodo {
  id: string;
  nome: string;
  descricao: string;
}

export interface Avaliacao {
  id: string;
  usuarioId: string;
  nota: number;
}

export interface Comentario {
  id: string;
  usuarioId: string;
  texto: string;
  criadoEm: string;
}

export interface Receita {
  id: string;
  titulo: string;
  metodoId: string;
  autorId: string;
  ingredientes: string[];
  modoPreparo: string;
  avaliacoes: Avaliacao[];
  comentarios: Comentario[];
  criadoEm: string;
}
