import { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { cores } from "../utils/tema";
import Botao from "../componentes/Botao";

interface Props {
  id: string;
}

export default function TelaComentarios({ id }: Props) {
  const [comentarios, setComentarios] = useState<string[]>([]);
  const [texto, setTexto] = useState("");

  const adicionarComentario = () => {
    if (texto.trim().length === 0) return;
    setComentarios([...comentarios, texto]);
    setTexto("");
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Comentários</Text>

      <FlatList
        data={comentarios}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <View style={estilos.comentario}>
            <Text style={estilos.comentarioTexto}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhum comentário ainda</Text>}
      />

      <TextInput
        style={estilos.campo}
        placeholder="Escreva um comentário"
        value={texto}
        onChangeText={setTexto}
      />

      <Botao texto="Enviar" onPress={adicionarComentario} />
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
  comentario: {
    backgroundColor: cores.principal,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  comentarioTexto: {
    color: "#fff",
  },
  vazio: {
    fontSize: 14,
    color: "#999",
    marginTop: 16,
  },
  campo: {
    borderWidth: 1,
    borderColor: cores.principal,
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    backgroundColor: "#fff",
  },
});
