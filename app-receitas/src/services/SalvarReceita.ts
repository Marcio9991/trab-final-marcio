import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";
import { NovaReceita } from "../types/Receita";

export default class SalvarReceita {
  static async executar(dados: NovaReceita): Promise<string> {
    const referencia = await addDoc(collection(db, COLECAO_RECEITAS), {
      ...dados,
      avaliacoes: [],
      comentarios: [],
      criadoEm: new Date().toISOString(),
    });
    return referencia.id;
  }
}
