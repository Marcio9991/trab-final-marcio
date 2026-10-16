import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";

export default class ExcluirReceita {
  static async executar(id: string): Promise<void> {
    await deleteDoc(doc(db, COLECAO_RECEITAS, id));
  }
}
