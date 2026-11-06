import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/tema";
import { metodos } from "../utils/metodos";
import { mostrarAlerta } from "../utils/alerta";
import { mensagemDeErro } from "../utils/mensagemErro";
import SairUsuario from "../services/SairUsuario";
import Cartao from "../componentes/Cartao";
import Botao from "../componentes/Botao";

export default function TelaInicio() {
  const router = useRouter();

  const sair = async () => {
    try {
      await SairUsuario.executar();
    } catch (erro) {
      mostrarAlerta("Erro ao sair", mensagemDeErro(erro));
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Métodos de preparo</Text>
      <FlatList
        data={metodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Cartao
            titulo={item.nome}
            descricao={item.descricao}
            onPress={() => router.push(`/topicos-receita/${item.id}`)}
          />
        )}
      />
      <Botao texto="Nova receita" onPress={() => router.push("/nova-receita")} />
      <Botao texto="Sair" onPress={sair} />
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
    marginBottom: 16,
  },
});
