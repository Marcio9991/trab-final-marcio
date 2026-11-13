import { Text, Pressable, StyleSheet } from "react-native";
import { cores } from "../utils/tema";

interface Props {
  texto: string;
  onPress: () => void;
  desabilitado?: boolean;
  variante?: "principal" | "secundario";
}

export default function Botao({ texto, onPress, desabilitado, variante = "principal" }: Props) {
  const secundario = variante === "secundario";

  return (
    <Pressable
      disabled={desabilitado}
      style={({ pressed }) => [
        estilos.botao,
        secundario ? estilos.contorno : null,
        {
          backgroundColor: pressed ? cores.destaque : secundario ? "transparent" : cores.principal,
        },
        desabilitado && estilos.desabilitado,
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={[estilos.texto, secundario && !pressed && estilos.textoContorno]}>{texto}</Text>
      )}
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
  contorno: {
    borderWidth: 1,
    borderColor: cores.principal,
  },
  texto: {
    color: "#fff",
    fontWeight: "600",
  },
  textoContorno: {
    color: cores.principal,
  },
  desabilitado: {
    opacity: 0.6,
  },
});
