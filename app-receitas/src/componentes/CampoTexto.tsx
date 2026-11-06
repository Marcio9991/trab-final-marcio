import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native";
import { cores } from "../utils/tema";

interface Props extends TextInputProps {
  rotulo?: string;
}

export default function CampoTexto({ rotulo, style, ...resto }: Props) {
  return (
    <View style={estilos.container}>
      {rotulo && <Text style={estilos.rotulo}>{rotulo}</Text>}
      <TextInput style={[estilos.campo, style]} placeholderTextColor="#999" {...resto} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.principal,
  },
  campo: {
    borderWidth: 1,
    borderColor: cores.principal,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    backgroundColor: "#fff",
  },
});
