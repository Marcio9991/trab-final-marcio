import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export default class RecuperarSenha {
  static async executar(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (erro) {
      if (erro instanceof FirebaseError && erro.code === "auth/user-not-found") return;
      throw erro;
    }
  }
}
