import { View, Text, StyleSheet } from "react-native";

interface Props {
  id: string;
}

export default function TelaTopicoReceitas({ id }: Props) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Receitas do método</Text>
      <Text style={estilos.subtitulo}>{id}</Text>
      <Text style={estilos.aviso}>Lista de receitas em construção</Text>
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
  },
  subtitulo: {
    fontSize: 16,
    color: "#8d6e63",
    marginTop: 4,
  },
  aviso: {
    fontSize: 14,
    color: "#999",
    marginTop: 24,
  },
});
