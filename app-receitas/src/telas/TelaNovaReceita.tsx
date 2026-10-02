import { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/cores";

const metodos = [
  { id: "filtragem", nome: "Filtragem" },
  { id: "infusao", nome: "Infusão" },
  { id: "pressao", nome: "Pressão" },
  { id: "decoccao", nome: "Decocção" },
];

export default function TelaNovaReceita() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [metodoId, setMetodoId] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");

  function publicar() {
    if (!titulo.trim() || !metodoId || !ingredientes.trim() || !modoPreparo.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos e escolha um método.");
      return;
    }

    // Quando o CRUD for definido, a receita será salva no Firestore aqui.
    const novaReceita = {
      titulo: titulo.trim(),
      metodoId,
      ingredientes: ingredientes.split("\n").map((i) => i.trim()).filter(Boolean),
      modoPreparo: modoPreparo.trim(),
      avaliacoes: [],
      comentarios: [],
      criadoEm: new Date().toISOString(),
    };
    console.log("Receita pronta para salvar:", novaReceita);

    Alert.alert("Receita publicada", "Sua receita foi enviada!");
    router.back();
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.rotulo}>Título</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Café coado tradicional"
        placeholderTextColor={cores.principal}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={estilos.rotulo}>Método de preparo</Text>
      <View style={estilos.metodos}>
        {metodos.map((m) => (
          <Pressable
            key={m.id}
            style={[estilos.metodo, metodoId === m.id && estilos.metodoSelecionado]}
            onPress={() => setMetodoId(m.id)}
          >
            <Text style={[estilos.metodoTexto, metodoId === m.id && estilos.metodoTextoSelecionado]}>
              {m.nome}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={estilos.rotulo}>Ingredientes (um por linha)</Text>
      <TextInput
        style={[estilos.input, estilos.areaTexto]}
        placeholder={"30 g de café moído\n500 ml de água"}
        placeholderTextColor={cores.principal}
        value={ingredientes}
        onChangeText={setIngredientes}
        multiline
      />

      <Text style={estilos.rotulo}>Modo de preparo</Text>
      <TextInput
        style={[estilos.input, estilos.areaTexto]}
        placeholder="Descreva o passo a passo"
        placeholderTextColor={cores.principal}
        value={modoPreparo}
        onChangeText={setModoPreparo}
        multiline
      />

      <Pressable style={estilos.botao} onPress={publicar}>
        <Text style={estilos.botaoTexto}>Publicar receita</Text>
      </Pressable>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16, paddingBottom: 32 },
  rotulo: { fontSize: 16, fontWeight: "600", color: cores.botao, marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: cores.principal,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: cores.botao,
  },
  areaTexto: { minHeight: 100, textAlignVertical: "top" },
  metodos: { flexDirection: "row", flexWrap: "wrap" },
  metodo: {
    borderWidth: 1,
    borderColor: cores.principal,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  metodoSelecionado: { backgroundColor: cores.principal },
  metodoTexto: { color: cores.botao, fontSize: 15 },
  metodoTextoSelecionado: { color: cores.textoClaro, fontWeight: "600" },
  botao: { backgroundColor: cores.botao, borderRadius: 8, padding: 14, alignItems: "center", marginTop: 24 },
  botaoTexto: { color: cores.textoClaro, fontSize: 16, fontWeight: "600" },
});
