import { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { cores } from "../utils/tema";
import { metodos } from "../utils/metodos";
import { mostrarAlerta } from "../utils/alerta";
import { DadosReceita } from "../types/Receita";
import Botao from "./Botao";
import CampoTexto from "./CampoTexto";

interface Props {
  titulo: string;
  textoBotao: string;
  salvando: boolean;
  onSalvar: (dados: DadosReceita) => void;
  inicial?: DadosReceita;
}

export default function FormularioReceita({ titulo, textoBotao, salvando, onSalvar, inicial }: Props) {
  const [metodoId, setMetodoId] = useState(inicial?.metodoId ?? "");
  const [nome, setNome] = useState(inicial?.titulo ?? "");
  const [ingredientes, setIngredientes] = useState(inicial?.ingredientes.join("\n") ?? "");
  const [modoPreparo, setModoPreparo] = useState(inicial?.modoPreparo ?? "");

  const confirmar = () => {
    const listaIngredientes = ingredientes
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (
      metodoId === "" ||
      nome.trim().length === 0 ||
      listaIngredientes.length === 0 ||
      modoPreparo.trim().length === 0
    ) {
      mostrarAlerta(
        "Campos obrigatórios",
        "Escolha o método e preencha título, ingredientes e modo de preparo"
      );
      return;
    }

    onSalvar({
      metodoId,
      titulo: nome.trim(),
      ingredientes: listaIngredientes,
      modoPreparo: modoPreparo.trim(),
    });
  };

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={estilos.titulo}>{titulo}</Text>

      <Text style={estilos.rotulo}>Método de preparo</Text>
      <View style={estilos.metodos}>
        {metodos.map((metodo) => {
          const selecionado = metodo.id === metodoId;
          return (
            <Pressable
              key={metodo.id}
              onPress={() => setMetodoId(metodo.id)}
              style={({ pressed }) => [
                estilos.opcao,
                selecionado && estilos.opcaoSelecionada,
                pressed && estilos.opcaoPressionada,
              ]}
            >
              <Text style={[estilos.opcaoTexto, selecionado && estilos.opcaoTextoSelecionado]}>
                {metodo.nome}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <CampoTexto rotulo="Título" value={nome} onChangeText={setNome} />
      <CampoTexto
        rotulo="Ingredientes (um por linha)"
        style={estilos.campoGrande}
        value={ingredientes}
        onChangeText={setIngredientes}
        multiline
      />
      <CampoTexto
        rotulo="Modo de preparo"
        style={estilos.campoGrande}
        value={modoPreparo}
        onChangeText={setModoPreparo}
        multiline
      />

      <Botao texto={textoBotao} onPress={confirmar} desabilitado={salvando} />
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
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.principal,
    marginTop: 12,
  },
  metodos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  opcao: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.principal,
    backgroundColor: "#fff",
  },
  opcaoSelecionada: {
    backgroundColor: cores.principal,
  },
  opcaoPressionada: {
    opacity: 0.7,
  },
  opcaoTexto: {
    color: cores.principal,
    fontWeight: "600",
  },
  opcaoTextoSelecionado: {
    color: "#fff",
  },
  campoGrande: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
