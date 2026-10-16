import { Text, Pressable, StyleSheet } from "react-native";
import { cores } from "../utils/tema";

interface Props {
  texto: string;
  onPress: () => void;
}

export default function Botao({ texto, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        estilos.botao,
        { backgroundColor: pressed ? cores.destaque : cores.principal },
      ]}
      onPress={onPress}
    >
      <Text style={estilos.texto}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  texto: {
    color: "#fff",
    fontWeight: "600",
  },
});
