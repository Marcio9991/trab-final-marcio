# Receitas de Café

Aplicativo mobile de receitas de café organizadas por método de preparo (Filtragem, Infusão, Pressão e Decocção). Os usuários podem publicar suas próprias receitas, dar uma nota de 1 a 5 estrelas e comentar nas receitas de outras pessoas.

## Tecnologias

- React Native com Expo e **TypeScript**
- Expo Router (navegação por rotas)
- Firebase / Firestore (banco de dados)

## Estrutura do projeto

```
app-receitas/
├── app/                 # Rotas e navegação (Expo Router)
│   ├── index.tsx
│   ├── topicos-receita/[id].tsx
│   ├── receita/[id].tsx
│   └── nova-receita.tsx
└── src/
    ├── telas/           # Telas do aplicativo
    ├── types/           # Interfaces TypeScript (Metodo, Receita, Avaliacao, Comentario)
    ├── utils/           # Utilitários, como a paleta de cores
    ├── componentes/     # Componentes reutilizáveis (em breve)
    └── services/        # Serviços de acesso a dados (em breve)
firebase-cli/            # Configuração do Firebase e do Firestore
documentacao/            # Visão, arquitetura, requisitos, interface e casos de uso
```

## Telas

- **TelaInicio**: lista os métodos de preparo.
- **TelaTopicoReceitas**: receitas de um método (em construção).
- **TelaReceita**: detalhes da receita, nota em estrelas e comentários.
- **TelaNovaReceita**: formulário para publicar uma nova receita.

## Identidade visual

Paleta com três tons de marrom: marrom escuro nos botões, marrom médio nas partes principais e marrom pastel claro no fundo (definidos em `src/utils/cores.ts`).

## Situação atual

O fluxo de navegação e as telas já funcionam como protótipo, com dados locais de exemplo. Os próximos passos são definir o modelo final de dados e integrar as receitas, notas e comentários ao Firestore.
