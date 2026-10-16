import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";
import { Receita } from "../types/Receita";

export default class ConsultarReceitas {
  static async todas(): Promise<Receita[]> {
    const resultado = await getDocs(collection(db, COLECAO_RECEITAS));
    return resultado.docs.map((item) => this.converter(item));
  }

  static async porMetodo(metodoId: string): Promise<Receita[]> {
    const consulta = query(
      collection(db, COLECAO_RECEITAS),
      where("metodoId", "==", metodoId)
    );
    const resultado = await getDocs(consulta);
    return resultado.docs.map((item) => this.converter(item));
  }

  static async porId(id: string): Promise<Receita | null> {
    const item = await getDoc(doc(db, COLECAO_RECEITAS, id));
    if (!item.exists()) return null;
    return this.converter(item);
  }

  private static converter(item: DocumentSnapshot<DocumentData>): Receita {
    return { ...item.data(), id: item.id } as Receita;
  }
}
