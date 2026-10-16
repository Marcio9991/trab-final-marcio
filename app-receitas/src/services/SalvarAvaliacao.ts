import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLECAO_RECEITAS } from "./colecoes";
import { gerarId } from "./gerarId";
import { Avaliacao } from "../types/Receita";

export default class SalvarAvaliacao {
  static async executar(receitaId: string, usuarioId: string, nota: number): Promise<void> {
    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
      throw new Error("A nota deve ser um número inteiro de 1 a 5");
    }

    const referencia = doc(db, COLECAO_RECEITAS, receitaId);
    const receita = await getDoc(referencia);
    if (!receita.exists()) {
      throw new Error("Receita não encontrada");
    }

    const avaliacoes: Avaliacao[] = receita.data().avaliacoes ?? [];
    const demaisUsuarios = avaliacoes.filter((item) => item.usuarioId !== usuarioId);

    await updateDoc(referencia, {
      avaliacoes: [...demaisUsuarios, { id: gerarId(), usuarioId, nota }],
    });
  }
}
