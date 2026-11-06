import { Text, StyleSheet } from "react-native";
import { cores } from "../utils/tema";

interface Props {
  texto: string;
}

export default function Aviso({ texto }: Props) {
  return <Text style={estilos.texto}>{texto}</Text>;
}

const estilos = StyleSheet.create({
  texto: {
    fontSize: 14,
    color: cores.destaque,
    opacity: 0.7,
    marginTop: 16,
  },
});
