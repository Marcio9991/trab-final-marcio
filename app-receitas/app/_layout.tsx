import { Stack } from "expo-router";
import { cores } from "../src/utils/cores";

const cabecalhoMarrom = {
  headerStyle: { backgroundColor: cores.principal },
  headerTintColor: cores.textoClaro,
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Receitas de café" }} />
      <Stack.Screen name="topicos-receita/[id]" options={{ title: "Método" }} />
      <Stack.Screen name="receita/[id]" options={{ title: "Receita", ...cabecalhoMarrom }} />
      <Stack.Screen name="nova-receita" options={{ title: "Nova receita", ...cabecalhoMarrom }} />
    </Stack>
  );
}
