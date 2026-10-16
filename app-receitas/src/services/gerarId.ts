import { collection, doc } from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";

export function gerarId(): string {
  return doc(collection(db, COLECAO_RECEITAS)).id;
}
