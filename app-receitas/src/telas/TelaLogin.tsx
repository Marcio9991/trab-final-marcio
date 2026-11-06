import { useState } from "react";
import { ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { cores } from "../utils/tema";
import { mostrarAlerta } from "../utils/alerta";
import { mensagemDeErro } from "../utils/mensagemErro";
import EntrarUsuario from "../services/EntrarUsuario";
import Botao from "../componentes/Botao";
import CampoTexto from "../componentes/CampoTexto";

export default function TelaLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [entrando, setEntrando] = useState(false);

  const entrar = async () => {
    if (email.trim().length === 0 || senha.length === 0) {
      mostrarAlerta("Login", "Informe o e-mail e a senha");
      return;
    }

    setEntrando(true);
    try {
      await EntrarUsuario.executar(email.trim(), senha);
    } catch (falha) {
      mostrarAlerta("Não foi possível entrar", mensagemDeErro(falha));
    } finally {
      setEntrando(false);
    }
  };

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={estilos.titulo}>Entrar</Text>

      <CampoTexto
        rotulo="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <CampoTexto rotulo="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <Botao texto="Entrar" onPress={entrar} desabilitado={entrando} />

      <Pressable onPress={() => router.push("/cadastro")}>
        <Text style={estilos.link}>Não tem conta? Cadastre-se</Text>
      </Pressable>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: cores.destaque,
    marginBottom: 4,
  },
  link: {
    color: cores.destaque,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
