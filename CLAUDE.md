# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o projeto

Primefinance é um app web de finanças pessoais (resumo do mês, transações, contas a pagar, contas fixas, metas por categoria, gráficos, backup/CSV e configurações de tema e cor). É publicado no Netlify como site estático.

## Fluxo de trabalho

1. Antes de alterar qualquer arquivo, explique em português, passo a passo, o que vai mudar e por quê.
2. Diga sempre se vai criar um arquivo novo ou editar um existente.
3. Depois de cada alteração, diga como testar: qual arquivo abrir no navegador e o que verificar.
4. Nunca faça commit nem envie para o GitHub sem o usuário pedir.
5. Quando o usuário disser "enviar", faça o commit com uma mensagem clara em português descrevendo a mudança e envie para o GitHub (branch `main`).
6. Os textos do app (rótulos, mensagens, alertas, estados vazios) devem usar **linguagem formal** em português do Brasil, no mesmo tom dos textos existentes (ex.: "Não há lançamentos registrados neste mês.", "Defina o valor máximo...").

## Comandos

Não há build, dependências, lint nem testes automatizados. Para rodar, basta abrir `index.html` no navegador. A publicação consiste em hospedar o `index.html` como arquivo estático (Netlify).

## Arquitetura

O app inteiro está em `index.html`: CSS em um `<style>`, um pequeno `<script>` no `<head>` e a lógica em um `<script>` no fim do `<body>`. Só usa recursos externos para as fontes Sora e Manrope (Google Fonts). O JavaScript é compacto, com nomes curtos, e deve continuar nesse estilo.

### Estado e persistência
- Todo o estado fica no objeto `S = {tx, bills, goals, recur}`, salvo como JSON no `localStorage` na chave `fin1-d-local` (`dk()`). Sempre chame `save()` depois de alterar `S`, e em seguida `render()`.
- Campos dos modelos: movimentação `{id, d (descrição), v (valor), t ('d' despesa | 'r' receita), c (categoria), dt ('AAAA-MM-DD')}`; conta `{id, d, v, dt, paid, rid?, ym?}`; conta fixa `{id, d, v, day, from ('AAAA-MM'), skip[]}`; `goals` mapeia categoria → limite mensal.
- Tema, cor e nome ficam em chaves separadas: `fin2-tema` (`escuro|claro`), `fin2-cor` (`roxo|verde|azul|cinza`) e `fin2-nome` (nome exibido na saudação "Olá, nome" do painel). O script do `<head>` aplica esses valores antes da renderização para evitar flash. Se mudar a lógica de tema/cor, atualize esse script **e** as funções `setTema`/`setAccent`.

### Fluxo de renderização
- `render()` redesenha tudo (painel, gráficos, listas) a partir de `S` e do mês selecionado em `#mes`. Não há atualização parcial.
- `go(view)` alterna entre as seções `v-painel`, `v-mov`, `v-contas` e `v-cfg` (definidas em `NAV`/`TITLES`).
- Os cliques são tratados por um único listener em `document`, por atributos: `data-go` (navegação), `data-new` (nova movimentação) e `data-act` + `data-id` (`edit`, `deltx`, `pay`, `editbill`, `delbill`, `delrec`, `mes`). Botões novos devem seguir esse padrão.
- Todo conteúdo do usuário inserido via `innerHTML` deve passar por `esc()`.

### Regras de negócio que envolvem várias partes do código
- **Contas fixas:** `genRecur()` cria uma conta em `S.bills` para cada mês, de `from` até o mês atual, com o `rid` da conta fixa e o `ym`. Ao excluir uma conta gerada, o mês vai para `skip` da conta fixa para não ser recriado.
- **Editar conta:** `editBillFn()` preenche o formulário de contas (só para contas não pagas). Em conta fixa, a alteração de nome, valor e dia vale também para a conta fixa e para as contas ainda não pagas dos meses seguintes.
- **Pagar conta:** `pay()` marca a conta como paga e cria uma despesa na categoria `Contas` com a data de hoje.
- **Categorias:** a lista `CATS` é fixa. A cor de cada categoria vem do índice (`--c1`…`--c8`) e o ícone vem de `ICO[nome]`. Para adicionar uma categoria, é preciso mexer nas três partes.
- **Backup:** o JSON exportado tem `app:'primefinance', versao:1`. A restauração (`$('rsf').onchange`) valida e **reconstrói campo a campo** cada registro, então qualquer campo novo no modelo precisa ser incluído na validação e no mapeamento da restauração, ou será descartado.
- **CSV:** usa `;` como separador, BOM UTF-8 e `csvCel()` para proteger contra injeção de fórmulas.

### Tema e layout
- As cores são variáveis CSS em `:root`. A cor de destaque usa `data-accent` e o tema usa `data-theme`. O tema é sempre escuro ou claro (não há modo automático): o script do `<head>` e `setTema` definem `data-theme` como `dark` ou `light`.
- Breakpoints: abaixo de 960px aparece a barra de abas inferior (`.tabbar`); a partir de 960px aparece a barra lateral (`.side`); a partir de 1100px o painel usa 4 colunas.

## Dados pessoais

O `.gitignore` exclui os arquivos exportados pelo app (`primefinance-backup-*.json`, `primefinance-movimentacoes-*.csv`). Não adicione esses arquivos ao repositório.
