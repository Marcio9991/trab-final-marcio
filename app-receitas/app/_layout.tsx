import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Receitas de café" }} />
      <Stack.Screen name="topicos-receita/[id]" options={{ title: "Método" }} />
    </Stack>
  );
}
