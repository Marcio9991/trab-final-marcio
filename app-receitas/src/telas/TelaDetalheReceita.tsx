import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { receitas } from "../utils/receitasMock";
import { cores } from "../utils/tema";
import Botao from "../componentes/Botao";

interface Props {
  id: string;
}

export default function TelaDetalheReceita({ id }: Props) {
  const router = useRouter();
  const receita = receitas.find((item) => item.id === id);

  if (!receita) {
    return (
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Receita não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{receita.titulo}</Text>

      <Text style={estilos.secao}>Ingredientes</Text>
      {receita.ingredientes.map((ingrediente) => (
        <Text key={ingrediente} style={estilos.texto}>
          • {ingrediente}
        </Text>
      ))}

      <Text style={estilos.secao}>Modo de preparo</Text>
      <Text style={estilos.texto}>{receita.modoPreparo}</Text>

      <Botao texto="Avaliar" onPress={() => router.push(`/receita/${id}/avaliar`)} />
      <Botao texto="Comentários" onPress={() => router.push(`/receita/${id}/comentarios`)} />
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
    marginBottom: 12,
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
