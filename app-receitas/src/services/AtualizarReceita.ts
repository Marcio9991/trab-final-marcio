import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";
import { EdicaoReceita } from "../types/Receita";

export default class AtualizarReceita {
  static async executar(id: string, dados: EdicaoReceita): Promise<void> {
    await updateDoc(doc(db, COLECAO_RECEITAS, id), dados);
  }
}
