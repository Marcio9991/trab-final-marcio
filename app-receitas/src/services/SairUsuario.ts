import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default class SairUsuario {
  static async executar(): Promise<void> {
    await signOut(auth);
  }
}
