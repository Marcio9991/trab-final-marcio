import { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from "react-native";
import { Receita } from "../types/Receita";
import { cores } from "../utils/cores";

interface Props {
  id: string;
}

const USUARIO_ATUAL = "usuario-atual";

// Dados de exemplo. Depois serão buscados no Firestore pelo id.
const receitaExemplo: Receita = {
  id: "1",
  titulo: "Café coado tradicional",
  metodoId: "filtragem",
  autorId: "maria",
  ingredientes: ["30 g de café moído", "500 ml de água a 92 °C", "Filtro de papel"],
  modoPreparo:
    "Coloque o filtro no suporte e molhe-o com água quente. Adicione o café, despeje a água aos poucos em movimentos circulares e aguarde terminar de coar.",
  avaliacoes: [
    { id: "a1", usuarioId: "joao", nota: 5 },
    { id: "a2", usuarioId: "ana", nota: 4 },
  ],
  comentarios: [
    { id: "c1", usuarioId: "joao", texto: "Ficou muito aromático!", criadoEm: "01/10/2026" },
  ],
  criadoEm: "30/09/2026",
};

export default function TelaReceita({ id }: Props) {
  const [receita, setReceita] = useState<Receita>({ ...receitaExemplo, id });
  const [texto, setTexto] = useState("");

  const minhaNota =
    receita.avaliacoes.find((a) => a.usuarioId === USUARIO_ATUAL)?.nota ?? 0;

  const media =
    receita.avaliacoes.length > 0
      ? receita.avaliacoes.reduce((soma, a) => soma + a.nota, 0) / receita.avaliacoes.length
      : 0;

  function avaliar(nota: number) {
    const outras = receita.avaliacoes.filter((a) => a.usuarioId !== USUARIO_ATUAL);
    setReceita({
      ...receita,
      avaliacoes: [...outras, { id: `a-${Date.now()}`, usuarioId: USUARIO_ATUAL, nota }],
    });
  }

  function comentar() {
    if (texto.trim() === "") return;
    setReceita({
      ...receita,
      comentarios: [
        ...receita.comentarios,
        {
          id: `c-${Date.now()}`,
          usuarioId: USUARIO_ATUAL,
          texto: texto.trim(),
          criadoEm: new Date().toLocaleDateString("pt-BR"),
        },
      ],
    });
    setTexto("");
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <View style={estilos.cartao}>
        <Text style={estilos.titulo}>{receita.titulo}</Text>
        <Text style={estilos.mediaTexto}>
          ★ {media.toFixed(1)} ({receita.avaliacoes.length} avaliações)
        </Text>
      </View>

      <Text style={estilos.secao}>Ingredientes</Text>
      {receita.ingredientes.map((item, i) => (
        <Text key={i} style={estilos.texto}>
          • {item}
        </Text>
      ))}

      <Text style={estilos.secao}>Modo de preparo</Text>
      <Text style={estilos.texto}>{receita.modoPreparo}</Text>

      <Text style={estilos.secao}>Sua nota</Text>
      <View style={estilos.estrelas}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => avaliar(n)}>
            <Text style={estilos.estrela}>{n <= minhaNota ? "★" : "☆"}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={estilos.secao}>Comentários</Text>
      {receita.comentarios.map((c) => (
        <View key={c.id} style={estilos.comentario}>
          <Text style={estilos.comentarioAutor}>
            {c.usuarioId} · {c.criadoEm}
          </Text>
          <Text style={estilos.comentarioTexto}>{c.texto}</Text>
        </View>
      ))}

      <TextInput
        style={estilos.input}
        placeholder="Escreva um comentário"
        placeholderTextColor={cores.principal}
        value={texto}
        onChangeText={setTexto}
        multiline
      />
      <Pressable style={estilos.botao} onPress={comentar}>
        <Text style={estilos.botaoTexto}>Comentar</Text>
      </Pressable>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16, paddingBottom: 32 },
  cartao: { backgroundColor: cores.principal, borderRadius: 8, padding: 16 },
  titulo: { fontSize: 22, fontWeight: "bold", color: cores.textoClaro },
  mediaTexto: { fontSize: 15, color: cores.textoClaro, marginTop: 6 },
  secao: { fontSize: 18, fontWeight: "600", color: cores.botao, marginTop: 20, marginBottom: 8 },
  texto: { fontSize: 15, color: cores.botao, marginBottom: 4 },
  estrelas: { flexDirection: "row" },
  estrela: { fontSize: 36, color: cores.principal, marginRight: 6 },
  comentario: { backgroundColor: cores.principal, borderRadius: 8, padding: 12, marginBottom: 8 },
  comentarioAutor: { fontSize: 12, color: cores.textoClaro, opacity: 0.85 },
  comentarioTexto: { fontSize: 15, color: cores.textoClaro, marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: cores.principal,
    borderRadius: 8,
    padding: 12,
    minHeight: 70,
    color: cores.botao,
    marginTop: 8,
    textAlignVertical: "top",
  },
  botao: { backgroundColor: cores.botao, borderRadius: 8, padding: 14, alignItems: "center", marginTop: 12 },
  botaoTexto: { color: cores.textoClaro, fontSize: 16, fontWeight: "600" },
});
