import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";
import { gerarId } from "./gerarId";
import { Comentario } from "../types/Receita";

export default class SalvarComentario {
  static async executar(receitaId: string, usuarioId: string, texto: string): Promise<void> {
    const comentario: Comentario = {
      id: gerarId(),
      usuarioId,
      texto,
      criadoEm: new Date().toISOString(),
    };

    await updateDoc(doc(db, COLECAO_RECEITAS, receitaId), {
      comentarios: arrayUnion(comentario),
    });
  }
}
