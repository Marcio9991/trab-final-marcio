import { useLocalSearchParams } from "expo-router";
import TelaComentarios from "../../../src/telas/TelaComentarios";

export default function Comentarios() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaComentarios id={id} />;
}
