import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Metodo } from "../types/Receita";

const metodos: Metodo[] = [
  { id: "filtragem", nome: "Filtragem", descricao: "Água quente passa pelo pó de café e por um filtro" },
  { id: "infusao", nome: "Infusão", descricao: "O pó fica submerso na água por alguns minutos" },
  { id: "pressao", nome: "Pressão", descricao: "A água é forçada a passar pelo café rapidamente" },
  { id: "decoccao", nome: "Decocção", descricao: "O pó ferve junto com a água" },
];

export default function TelaInicio() {
  const router = useRouter();

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Métodos de preparo</Text>
      <FlatList
        data={metodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={estilos.item}
            onPress={() => router.push(`/topicos-receita/${item.id}`)}
          >
            <Text style={estilos.itemTitulo}>{item.nome}</Text>
            <Text style={estilos.itemDescricao}>{item.descricao}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f2e9e4",
    marginBottom: 12,
  },
  itemTitulo: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemDescricao: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
