import { Alert, Platform } from "react-native";

export function mostrarAlerta(titulo: string, mensagem: string): void {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n${mensagem}`);
    return;
  }
  Alert.alert(titulo, mensagem);
}

export function confirmar(titulo: string, mensagem: string): Promise<boolean> {
  if (Platform.OS === "web") {
    return Promise.resolve(window.confirm(`${titulo}\n${mensagem}`));
  }
  return new Promise((resolver) => {
    Alert.alert(
      titulo,
      mensagem,
      [
        { text: "Cancelar", style: "cancel", onPress: () => resolver(false) },
        { text: "Confirmar", style: "destructive", onPress: () => resolver(true) },
      ],
      { cancelable: true, onDismiss: () => resolver(false) }
    );
  });
}
