# Receitas de Café

Aplicativo mobile para consultar métodos de preparo de café e, futuramente, visualizar receitas, avaliações, comentários e dicas da comunidade. A proposta é organizar receitas por método de preparo e permitir que os usuários compartilhem suas experiências.

## Arquitetura

O projeto está estruturado como uma aplicação mobile em **React Native com Expo e TypeScript**, utilizando o **Expo Router** para navegação.

- `app/`: define as rotas da aplicação e a configuração principal da navegação.
- `src/telas/`: contém as telas e a apresentação das funcionalidades.
- `src/types/`: reúne as interfaces TypeScript usadas no domínio, como métodos, receitas, avaliações e comentários.
- `firebase-cli/service/`: contém a configuração inicial do Firebase e do Firestore, que será utilizado como banco de dados.
- `documentacao/`: reúne os registros de visão, arquitetura, requisitos, interface e casos de uso.

A navegação segue uma estrutura simples: a tela inicial lista os métodos de preparo e cada item direciona para uma rota dinâmica com o identificador do método selecionado.

## O que foi feito até agora

- Estrutura inicial do aplicativo mobile criada.
- Navegação configurada com Expo Router.
- Tela inicial implementada com os métodos de **Filtragem**, **Infusão**, **Pressão** e **Decocção**.
- Descrições básicas dos métodos exibidas em uma lista interativa.
- Rota dinâmica para acessar um tópico de receita.
- Tela de tópico criada como base para receber as receitas de cada método.
- Tipos TypeScript definidos para métodos, receitas, avaliações e comentários.
- Configuração inicial do Firebase com acesso ao Firestore preparada.
- Documentação inicial do projeto organizada.

## Situação atual

O fluxo de navegação e a interface inicial já estão funcionando como protótipo. A lista de receitas ainda está em construção. Os próximos passos são definir o modelo final de dados e implementar o CRUD das receitas, além de adicionar avaliações, comentários e integração efetiva com o Firestore.
