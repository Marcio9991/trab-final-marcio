import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ProvedorAutenticacao, useAutenticacao } from "../src/contextos/ContextoAutenticacao";
import { cores } from "../src/utils/tema";

SplashScreen.preventAutoHideAsync();

function Navegacao() {
  const { usuario, carregando } = useAutenticacao();

  useEffect(() => {
    if (!carregando) {
      SplashScreen.hideAsync();
    }
  }, [carregando]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: cores.principal },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Stack.Protected guard={!!usuario}>
        <Stack.Screen name="index" options={{ title: "Receitas de café" }} />
        <Stack.Screen name="topicos-receita/[id]" options={{ title: "Receitas" }} />
        <Stack.Screen name="receita/[id]" options={{ title: "Receita" }} />
        <Stack.Screen name="receita/[id]/avaliar" options={{ title: "Avaliar" }} />
        <Stack.Screen name="receita/[id]/comentarios" options={{ title: "Comentários" }} />
        <Stack.Screen name="receita/[id]/editar" options={{ title: "Editar receita" }} />
        <Stack.Screen name="nova-receita" options={{ title: "Nova receita" }} />
      </Stack.Protected>

      <Stack.Protected guard={!usuario}>
        <Stack.Screen name="login" options={{ title: "Entrar" }} />
        <Stack.Screen name="cadastro" options={{ title: "Criar conta" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ProvedorAutenticacao>
      <Navegacao />
    </ProvedorAutenticacao>
  );
}
