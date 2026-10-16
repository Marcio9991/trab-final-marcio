import { useLocalSearchParams } from "expo-router";
import TelaAvaliar from "../../../src/telas/TelaAvaliar";

export default function Avaliar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaAvaliar id={id} />;
}
