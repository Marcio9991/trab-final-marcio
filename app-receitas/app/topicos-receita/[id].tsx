import { useLocalSearchParams } from "expo-router";
import TelaTopicoReceitas from "../../src/telas/TelaTopicoReceitas";

export default function TopicoReceita() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaTopicoReceitas id={id} />;
}
