import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/tema";
import Botao from "../componentes/Botao";

interface Props {
  id: string;
}

export default function TelaAvaliar({ id }: Props) {
  const router = useRouter();
  const [nota, setNota] = useState(0);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Avaliar receita</Text>

      <View style={estilos.estrelas}>
        {[1, 2, 3, 4, 5].map((valor) => (
          <Pressable key={valor} onPress={() => setNota(valor)}>
            <Text style={[estilos.estrela, valor <= nota && estilos.estrelaPreenchida]}>★</Text>
          </Pressable>
        ))}
      </View>

      <Botao texto={`Confirmar nota: ${nota}`} onPress={() => router.back()} />
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
    marginBottom: 24,
  },
  estrelas: {
    flexDirection: "row",
    gap: 8,
  },
  estrela: {
    fontSize: 36,
    color: "#ccc",
  },
  estrelaPreenchida: {
    color: cores.principal,
  },
});
