import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { mensagemDeErro } from "../utils/mensagemErro";

export function useConsulta<T>(buscar: () => Promise<T>, dependencias: unknown[]) {
  const [dados, setDados] = useState<T | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [versao, setVersao] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      setErro(null);
      buscar()
        .then((resultado) => {
          if (ativo) setDados(resultado);
        })
        .catch((falha) => {
          if (ativo) setErro(mensagemDeErro(falha));
        })
        .finally(() => {
          if (ativo) setCarregando(false);
        });
      return () => {
        ativo = false;
      };
    }, [...dependencias, versao])
  );

  const recarregar = () => setVersao((atual) => atual + 1);

  return { dados, carregando, erro, recarregar };
}
