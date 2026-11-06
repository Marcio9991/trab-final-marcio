import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export default class CadastrarUsuario {
  static async executar(nome: string, email: string, senha: string): Promise<void> {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(credencial.user, { displayName: nome });
  }
}
