import { useLocalSearchParams } from "expo-router";
import TelaEditarReceita from "../../../src/telas/TelaEditarReceita";

export default function Editar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaEditarReceita id={id} />;
}
