import { View, ActivityIndicator, StyleSheet } from "react-native";
import { cores } from "../utils/tema";

export default function Carregando() {
  return (
    <View style={estilos.container}>
      <ActivityIndicator size="large" color={cores.principal} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: cores.fundo,
  },
});
