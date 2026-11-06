import { useLocalSearchParams } from "expo-router";
import TelaListaReceitas from "../../src/telas/TelaListaReceitas";

export default function TopicoReceita() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaListaReceitas id={id} />;
}
