export interface Metodo {
  id: string;
  nome: string;
  descricao: string;
}

export interface Autor {
  id: string;
  nome: string;
}

export interface Avaliacao {
  id: string;
  usuarioId: string;
  nota: number;
}

export interface Comentario {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  texto: string;
  criadoEm: string;
}

export interface Receita {
  id: string;
  titulo: string;
  metodoId: string;
  autorId: string;
  autorNome: string;
  ingredientes: string[];
  modoPreparo: string;
  avaliacoes: Avaliacao[];
  comentarios: Comentario[];
  criadoEm: string;
}

export type NovaReceita = Pick<
  Receita,
  "titulo" | "metodoId" | "autorId" | "autorNome" | "ingredientes" | "modoPreparo"
>;

export type EdicaoReceita = Partial<
  Pick<Receita, "titulo" | "metodoId" | "ingredientes" | "modoPreparo">
>;
