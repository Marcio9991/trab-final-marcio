import { useLocalSearchParams } from "expo-router";
import TelaDetalheReceita from "../../src/telas/TelaDetalheReceita";

export default function Receita() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaDetalheReceita id={id} />;
}
