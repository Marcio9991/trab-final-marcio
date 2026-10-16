# Interface

## Paleta de cores

O app usa três tons de marrom, definidos em `src/utils/tema.ts` e aplicados em todas as telas:

- **Pastel** (`#F2E9E4`) — fundo das telas
- **Médio** (`#8D6E63`) — áreas principais: cartões, botões, bordas de campo
- **Escuro** (`#4E342E`) — estado pressionado dos botões e cartões

## Padrão de telas

Toda tela usa `cores.fundo` no container, `cores.principal` nos elementos de destaque e `cores.destaque` quando o elemento é pressionado. Esse padrão fica centralizado em dois componentes reutilizáveis:

- `src/componentes/Botao.tsx` — botão de ação (avaliar, comentar, salvar, enviar)
- `src/componentes/Cartao.tsx` — item de lista clicável (métodos, receitas)

Assim, qualquer tela nova só precisa usar esses dois componentes pra manter o mesmo visual, sem repetir estilo.
