import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";

interface ValorContexto {
  usuario: User | null;
  carregando: boolean;
}

const ContextoAutenticacao = createContext<ValorContexto>({
  usuario: null,
  carregando: true,
});

export function ProvedorAutenticacao({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (usuarioAtual) => {
      setUsuario(usuarioAtual);
      setCarregando(false);
    });
    return cancelar;
  }, []);

  return (
    <ContextoAutenticacao.Provider value={{ usuario, carregando }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
}

export function useAutenticacao(): ValorContexto {
  return useContext(ContextoAutenticacao);
}
