import { User } from "firebase/auth";
import { Autor } from "../types/Receita";

export function paraAutor(usuario: User): Autor {
  return {
    id: usuario.uid,
    nome: usuario.displayName ?? usuario.email ?? "Usuário",
  };
}
