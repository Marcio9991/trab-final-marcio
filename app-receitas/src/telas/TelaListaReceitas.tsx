import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { receitas } from "../utils/receitasMock";
import { cores } from "../utils/tema";
import Cartao from "../componentes/Cartao";

interface Props {
  id: string;
}

export default function TelaListaReceitas({ id }: Props) {
  const router = useRouter();
  const receitasDoMetodo = receitas.filter((receita) => receita.metodoId === id);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Receitas</Text>
      <FlatList
        data={receitasDoMetodo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Cartao titulo={item.titulo} onPress={() => router.push(`/receita/${item.id}`)} />
        )}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhuma receita cadastrada ainda</Text>}
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
  vazio: {
    fontSize: 14,
    color: "#999",
    marginTop: 24,
  },
});
