import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/tema";
import { metodos } from "../utils/metodos";
import { descreverAvaliacao } from "../utils/avaliacao";
import { useConsulta } from "../hooks/useConsulta";
import ConsultarReceitas from "../services/ConsultarReceitas";
import Cartao from "../componentes/Cartao";
import Carregando from "../componentes/Carregando";
import Aviso from "../componentes/Aviso";

interface Props {
  id: string;
}

export default function TelaListaReceitas({ id }: Props) {
  const router = useRouter();
  const { dados, carregando, erro } = useConsulta(() => ConsultarReceitas.porMetodo(id), [id]);
  const metodo = metodos.find((item) => item.id === id);

  if (carregando) return <Carregando />;

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{metodo ? `Receitas de ${metodo.nome}` : "Receitas"}</Text>
      {erro && <Aviso texto={erro} />}
      <FlatList
        data={dados ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Cartao
            titulo={item.titulo}
            descricao={`${item.autorNome} · ${descreverAvaliacao(item.avaliacoes)}`}
            onPress={() => router.push(`/receita/${item.id}`)}
          />
        )}
        ListEmptyComponent={erro ? undefined : <Aviso texto="Nenhuma receita cadastrada ainda" />}
      />
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
