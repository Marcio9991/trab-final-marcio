import { Avaliacao } from "../types/Receita";

export function calcularMedia(avaliacoes: Avaliacao[]): number {
  if (avaliacoes.length === 0) return 0;
  const soma = avaliacoes.reduce((total, item) => total + item.nota, 0);
  return soma / avaliacoes.length;
}

export function descreverAvaliacao(avaliacoes: Avaliacao[]): string {
  if (avaliacoes.length === 0) return "Sem avaliações";
  const media = calcularMedia(avaliacoes).toFixed(1).replace(".", ",");
  const quantidade = avaliacoes.length === 1 ? "1 avaliação" : `${avaliacoes.length} avaliações`;
  return `★ ${media} · ${quantidade}`;
}
