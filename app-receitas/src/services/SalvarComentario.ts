import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";
import { gerarId } from "./gerarId";
import { Autor, Comentario } from "../types/Receita";

export default class SalvarComentario {
  static async executar(receitaId: string, autor: Autor, texto: string): Promise<void> {
    const comentario: Comentario = {
      id: gerarId(),
      usuarioId: autor.id,
      usuarioNome: autor.nome,
      texto,
      criadoEm: new Date().toISOString(),
    };

    await updateDoc(doc(db, COLECAO_RECEITAS, receitaId), {
      comentarios: arrayUnion(comentario),
    });
  }
}
