import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Receitas de café" }} />
      <Stack.Screen name="topicos-receita/[id]" options={{ title: "Receitas" }} />
      <Stack.Screen name="receita/[id]" options={{ title: "Receita" }} />
      <Stack.Screen name="receita/[id]/avaliar" options={{ title: "Avaliar" }} />
      <Stack.Screen name="receita/[id]/comentarios" options={{ title: "Comentários" }} />
      <Stack.Screen name="nova-receita" options={{ title: "Nova receita" }} />
    </Stack>
  );
}
