import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default class EntrarUsuario {
  static async executar(email: string, senha: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, senha);
  }
}
