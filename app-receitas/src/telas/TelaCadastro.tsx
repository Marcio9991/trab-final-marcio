import { useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { cores } from "../utils/tema";
import { mostrarAlerta } from "../utils/alerta";
import { mensagemDeErro } from "../utils/mensagemErro";
import CadastrarUsuario from "../services/CadastrarUsuario";
import Botao from "../componentes/Botao";
import CampoTexto from "../componentes/CampoTexto";

export default function TelaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cadastrando, setCadastrando] = useState(false);

  const cadastrar = async () => {
    if (nome.trim().length === 0 || email.trim().length === 0 || senha.length === 0) {
      mostrarAlerta("Cadastro", "Preencha nome, e-mail e senha");
      return;
    }

    setCadastrando(true);
    try {
      await CadastrarUsuario.executar(nome.trim(), email.trim(), senha);
    } catch (falha) {
      mostrarAlerta("Não foi possível cadastrar", mensagemDeErro(falha));
    } finally {
      setCadastrando(false);
    }
  };

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={estilos.titulo}>Criar conta</Text>

      <CampoTexto rotulo="Nome" value={nome} onChangeText={setNome} />
      <CampoTexto
        rotulo="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <CampoTexto
        rotulo="Senha (mínimo 6 caracteres)"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Botao texto="Cadastrar" onPress={cadastrar} desabilitado={cadastrando} />
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
});
