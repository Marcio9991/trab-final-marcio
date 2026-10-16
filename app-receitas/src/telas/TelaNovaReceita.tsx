import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/tema";
import Botao from "../componentes/Botao";

export default function TelaNovaReceita() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Nova receita</Text>

      <Text style={estilos.rotulo}>Título</Text>
      <TextInput style={estilos.campo} value={titulo} onChangeText={setTitulo} />

      <Text style={estilos.rotulo}>Ingredientes</Text>
      <TextInput
        style={[estilos.campo, estilos.campoGrande]}
        value={ingredientes}
        onChangeText={setIngredientes}
        multiline
      />

      <Text style={estilos.rotulo}>Modo de preparo</Text>
      <TextInput
        style={[estilos.campo, estilos.campoGrande]}
        value={modoPreparo}
        onChangeText={setModoPreparo}
        multiline
      />

      <Botao texto="Salvar receita" onPress={() => router.back()} />
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
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.principal,
    marginTop: 12,
  },
  campo: {
    borderWidth: 1,
    borderColor: cores.principal,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    backgroundColor: "#fff",
  },
  campoGrande: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
