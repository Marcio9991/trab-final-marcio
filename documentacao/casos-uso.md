# Casos de uso

Ator em todos os casos: **usuário**. Nos casos UC04 a UC09 o usuário precisa estar logado.

## UC01 — Cadastrar-se

- **Pré-condição:** não estar logado.
- **Fluxo principal:** 1) abre "Cadastre-se" na tela de login; 2) informa nome, e-mail e senha; 3) toca em "Cadastrar"; 4) o sistema cria a conta e abre a tela inicial.
- **Alternativos:** campo vazio, e-mail inválido, e-mail já cadastrado, senha com menos de 6 caracteres ou falta de internet: o sistema mostra um alerta e continua na tela.

## UC02 — Entrar

- **Pré-condição:** ter conta e não estar logado.
- **Fluxo principal:** 1) informa e-mail e senha; 2) toca em "Entrar"; 3) o sistema abre a tela inicial.
- **Alternativos:** campo vazio ou credenciais incorretas: o sistema mostra um alerta.

## UC03 — Sair

- **Fluxo principal:** na tela inicial, toca em "Sair"; o sistema encerra a sessão e volta para a tela de login.

## UC04 — Consultar receitas por método

- **Fluxo principal:** 1) escolhe um método na tela inicial; 2) o sistema lista as receitas do método com autor e média de avaliação; 3) toca em uma receita para abri-la (UC05).
- **Alternativos:** sem receitas, mostra "Nenhuma receita cadastrada ainda"; falha ao consultar, mostra a mensagem de erro.

## UC05 — Ver receita

- **Fluxo principal:** o sistema mostra título, autor, média, ingredientes e modo de preparo, com os botões "Avaliar" e "Comentários". Se o usuário for o autor, aparece também "Excluir receita".
- **Alternativos:** receita inexistente (por exemplo, já excluída): mostra "Receita não encontrada".

## UC06 — Avaliar receita

- **Fluxo principal:** 1) toca em "Avaliar"; 2) escolhe de 1 a 5 estrelas (a nota anterior vem marcada, se houver); 3) toca em "Salvar avaliação"; 4) o sistema grava e volta para a receita, já com a média atualizada.
- **Alternativos:** salvar sem escolher nota mostra um alerta. Avaliar de novo substitui a nota anterior.

## UC07 — Comentar receita

- **Fluxo principal:** 1) toca em "Comentários" e vê os comentários existentes; 2) escreve o texto; 3) toca em "Enviar"; 4) o comentário aparece na lista com o nome do autor.
- **Alternativos:** texto vazio não é enviado; erro de gravação mostra um alerta.

## UC08 — Publicar receita

- **Fluxo principal:** 1) toca em "Nova receita" na tela inicial; 2) escolhe o método e preenche título, ingredientes (um por linha) e modo de preparo; 3) toca em "Salvar receita"; 4) o sistema grava e abre a lista do método escolhido, já com a nova receita.
- **Alternativos:** campo obrigatório vazio ou método não escolhido mostra um alerta.

## UC09 — Excluir receita

- **Pré-condição:** ser o autor da receita.
- **Fluxo principal:** 1) toca em "Excluir receita"; 2) confirma a exclusão; 3) o sistema remove a receita e volta para a lista.
- **Alternativos:** cancelar a confirmação não exclui nada.
