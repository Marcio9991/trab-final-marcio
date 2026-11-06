import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/tema";
import { mostrarAlerta } from "../utils/alerta";
import { mensagemDeErro } from "../utils/mensagemErro";
import { useAutenticacao } from "../contextos/ContextoAutenticacao";
import { useConsulta } from "../hooks/useConsulta";
import ConsultarReceitas from "../services/ConsultarReceitas";
import SalvarAvaliacao from "../services/SalvarAvaliacao";
import Botao from "../componentes/Botao";

interface Props {
  id: string;
}

export default function TelaAvaliar({ id }: Props) {
  const router = useRouter();
  const { usuario } = useAutenticacao();
  const { dados: receita } = useConsulta(() => ConsultarReceitas.porId(id), [id]);
  const [nota, setNota] = useState(0);
  const [salvando, setSalvando] = useState(false);

  const notaAnterior =
    receita?.avaliacoes.find((item) => item.usuarioId === usuario?.uid)?.nota ?? 0;

  useEffect(() => {
    if (notaAnterior > 0) setNota(notaAnterior);
  }, [notaAnterior]);

  const salvar = async () => {
    if (!usuario) return;
    if (nota < 1) {
      mostrarAlerta("Avaliação", "Escolha uma nota de 1 a 5 estrelas");
      return;
    }

    setSalvando(true);
    try {
      await SalvarAvaliacao.executar(id, usuario.uid, nota);
      router.back();
    } catch (falha) {
      mostrarAlerta("Erro ao avaliar", mensagemDeErro(falha));
      setSalvando(false);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Avaliar receita</Text>

      <View style={estilos.estrelas}>
        {[1, 2, 3, 4, 5].map((valor) => (
          <Pressable key={valor} onPress={() => setNota(valor)}>
            <Text style={[estilos.estrela, valor <= nota && estilos.estrelaPreenchida]}>★</Text>
          </Pressable>
        ))}
      </View>

      <Botao texto="Salvar avaliação" onPress={salvar} desabilitado={salvando} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: cores.fundo,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: cores.destaque,
    marginBottom: 24,
  },
  estrelas: {
    flexDirection: "row",
    gap: 8,
  },
  estrela: {
    fontSize: 36,
    color: "#ccc",
  },
  estrelaPreenchida: {
    color: cores.principal,
  },
});
