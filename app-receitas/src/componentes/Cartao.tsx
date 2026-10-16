import { Text, Pressable, StyleSheet } from "react-native";
import { cores } from "../utils/tema";

interface Props {
  titulo: string;
  descricao?: string;
  onPress: () => void;
}

export default function Cartao({ titulo, descricao, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        estilos.cartao,
        { backgroundColor: pressed ? cores.destaque : cores.principal },
      ]}
      onPress={onPress}
    >
      <Text style={estilos.titulo}>{titulo}</Text>
      {descricao && <Text style={estilos.descricao}>{descricao}</Text>}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  descricao: {
    fontSize: 14,
    color: "#f2e9e4",
    marginTop: 4,
  },
});
