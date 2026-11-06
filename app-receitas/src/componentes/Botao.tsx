import { Text, Pressable, StyleSheet } from "react-native";
import { cores } from "../utils/tema";

interface Props {
  texto: string;
  onPress: () => void;
  desabilitado?: boolean;
}

export default function Botao({ texto, onPress, desabilitado }: Props) {
  return (
    <Pressable
      disabled={desabilitado}
      style={({ pressed }) => [
        estilos.botao,
        { backgroundColor: pressed ? cores.destaque : cores.principal },
        desabilitado && estilos.desabilitado,
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
  desabilitado: {
    opacity: 0.6,
  },
});
