import { useState } from "react";
import { View, Text, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { cores } from "../utils/tema";
import { mostrarAlerta } from "../utils/alerta";
import { mensagemDeErro } from "../utils/mensagemErro";
import { paraAutor } from "../utils/autor";
import { useAutenticacao } from "../contextos/ContextoAutenticacao";
import { useConsulta } from "../hooks/useConsulta";
import ConsultarReceitas from "../services/ConsultarReceitas";
import SalvarComentario from "../services/SalvarComentario";
import Botao from "../componentes/Botao";
import CampoTexto from "../componentes/CampoTexto";
import Carregando from "../componentes/Carregando";
import Aviso from "../componentes/Aviso";

interface Props {
  id: string;
}

export default function TelaComentarios({ id }: Props) {
  const { usuario } = useAutenticacao();
  const { dados: receita, carregando, erro, recarregar } = useConsulta(
    () => ConsultarReceitas.porId(id),
    [id]
  );
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (carregando) return <Carregando />;

  const enviar = async () => {
    if (!usuario) return;
    const conteudo = texto.trim();
    if (conteudo.length === 0) return;

    setEnviando(true);
    try {
      await SalvarComentario.executar(id, paraAutor(usuario), conteudo);
      setTexto("");
      recarregar();
    } catch (falha) {
      mostrarAlerta("Erro ao comentar", mensagemDeErro(falha));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={estilos.titulo}>Comentários</Text>
      {erro && <Aviso texto={erro} />}

      <FlatList
        style={estilos.lista}
        data={receita?.comentarios ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.comentario}>
            <Text style={estilos.comentarioAutor}>{item.usuarioNome}</Text>
            <Text style={estilos.comentarioTexto}>{item.texto}</Text>
          </View>
        )}
        ListEmptyComponent={erro ? undefined : <Aviso texto="Nenhum comentário ainda" />}
      />

      <CampoTexto placeholder="Escreva um comentário" value={texto} onChangeText={setTexto} />
      <Botao texto="Enviar" onPress={enviar} desabilitado={enviando} />
    </KeyboardAvoidingView>
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
    marginBottom: 16,
  },
  lista: {
    flex: 1,
  },
  comentario: {
    backgroundColor: cores.principal,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  comentarioAutor: {
    color: cores.fundo,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  comentarioTexto: {
    color: "#fff",
  },
});
