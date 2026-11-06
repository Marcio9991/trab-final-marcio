import { FirebaseError } from "firebase/app";

const mensagens: Record<string, string> = {
  "auth/invalid-email": "E-mail inválido",
  "auth/invalid-credential": "E-mail ou senha incorretos",
  "auth/wrong-password": "E-mail ou senha incorretos",
  "auth/user-not-found": "E-mail ou senha incorretos",
  "auth/email-already-in-use": "Este e-mail já está cadastrado",
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres",
  "auth/missing-password": "Informe a senha",
  "auth/network-request-failed": "Sem conexão com a internet",
  "auth/too-many-requests": "Muitas tentativas, tente novamente mais tarde",
  "permission-denied": "Sem permissão para realizar esta ação",
  "not-found": "Receita não encontrada",
  unavailable: "Serviço indisponível no momento",
};

export function mensagemDeErro(erro: unknown): string {
  if (erro instanceof FirebaseError) {
    return mensagens[erro.code] ?? "Ocorreu um erro inesperado";
  }
  if (erro instanceof Error) {
    return erro.message;
  }
  return "Ocorreu um erro inesperado";
}
