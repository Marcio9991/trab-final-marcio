import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/tema";
import { descreverAvaliacao } from "../utils/avaliacao";
import { confirmar, mostrarAlerta } from "../utils/alerta";
import { mensagemDeErro } from "../utils/mensagemErro";
import { useAutenticacao } from "../contextos/ContextoAutenticacao";
import { useConsulta } from "../hooks/useConsulta";
import ConsultarReceitas from "../services/ConsultarReceitas";
import ExcluirReceita from "../services/ExcluirReceita";
import Botao from "../componentes/Botao";
import Carregando from "../componentes/Carregando";
import Aviso from "../componentes/Aviso";

interface Props {
  id: string;
}

export default function TelaDetalheReceita({ id }: Props) {
  const router = useRouter();
  const { usuario } = useAutenticacao();
  const { dados: receita, carregando, erro } = useConsulta(() => ConsultarReceitas.porId(id), [id]);
  const [excluindo, setExcluindo] = useState(false);

  if (carregando) return <Carregando />;

  if (erro || !receita) {
    return (
      <View style={estilos.container}>
        <Aviso texto={erro ?? "Receita não encontrada"} />
      </View>
    );
  }

  const ehAutor = usuario?.uid === receita.autorId;

  const excluir = async () => {
    const confirmado = await confirmar(
      "Excluir receita",
      "Essa ação não pode ser desfeita. Deseja excluir?"
    );
    if (!confirmado) return;

    setExcluindo(true);
    try {
      await ExcluirReceita.executar(id);
      router.back();
    } catch (falha) {
      mostrarAlerta("Erro ao excluir", mensagemDeErro(falha));
      setExcluindo(false);
    }
  };

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.titulo}>{receita.titulo}</Text>
      <Text style={estilos.autor}>por {receita.autorNome}</Text>
      <Text style={estilos.avaliacao}>{descreverAvaliacao(receita.avaliacoes)}</Text>

      <Text style={estilos.secao}>Ingredientes</Text>
      {receita.ingredientes.map((ingrediente, indice) => (
        <Text key={`${indice}-${ingrediente}`} style={estilos.texto}>
          • {ingrediente}
        </Text>
      ))}

      <Text style={estilos.secao}>Modo de preparo</Text>
      <Text style={estilos.texto}>{receita.modoPreparo}</Text>

      <Botao texto="Avaliar" onPress={() => router.push(`/receita/${id}/avaliar`)} />
      <Botao
        texto={`Comentários (${receita.comentarios.length})`}
        onPress={() => router.push(`/receita/${id}/comentarios`)}
      />
      {ehAutor && <Botao texto="Excluir receita" onPress={excluir} desabilitado={excluindo} />}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: cores.destaque,
  },
  autor: {
    fontSize: 14,
    color: cores.principal,
    marginTop: 4,
  },
  avaliacao: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.destaque,
    marginTop: 8,
  },
  secao: {
    fontSize: 16,
    fontWeight: "600",
    color: cores.principal,
    marginTop: 16,
  },
  texto: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
});
