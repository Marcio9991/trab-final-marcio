import { useLocalSearchParams } from "expo-router";
import TelaReceita from "../../src/telas/TelaReceita";

export default function Receita() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaReceita id={id} />;
}
