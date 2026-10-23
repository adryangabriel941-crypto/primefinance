# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o projeto

Primefinance é um app web de finanças pessoais (resumo do mês com comparação com o mês anterior, transações com busca e filtros, compras parceladas, receitas fixas, contas a pagar, contas fixas, metas por categoria, objetivos de economia, alerta de contas a vencer, gráficos, backup/CSV e configurações de tema e cor). Tem login com e-mail e senha (Supabase) e salva os dados de cada usuário na nuvem. É publicado no Netlify como site estático e pode ser instalado no celular (PWA).

## Fluxo de trabalho

1. Antes de alterar qualquer arquivo, explique em português, passo a passo, o que vai mudar e por quê.
2. Diga sempre se vai criar um arquivo novo ou editar um existente.
3. Depois de cada alteração, diga como testar: qual arquivo abrir no navegador e o que verificar.
4. Nunca faça commit nem envie para o GitHub sem o usuário pedir.
5. Quando o usuário disser "enviar", faça o commit com uma mensagem clara em português descrevendo a mudança e envie para o GitHub (branch `main`).
6. Os textos do app (rótulos, mensagens, alertas, estados vazios) devem usar **linguagem formal** em português do Brasil, no mesmo tom dos textos existentes (ex.: "Não há lançamentos registrados neste mês.", "Defina o valor máximo...").

## Comandos

Não há build, dependências, lint nem testes automatizados. Para rodar, basta abrir `index.html` no navegador (é preciso internet para entrar na conta). A publicação consiste em hospedar a pasta como site estático (Netlify): `index.html` e os arquivos da instalação no celular. O site `sweet-sherbet-0418dd` do Netlify está ligado ao GitHub e publica automaticamente a cada envio para a `main`.

## Arquitetura

O app inteiro está em `index.html`: CSS em um `<style>`, um pequeno `<script>` no `<head>` e a lógica em um `<script>` no fim do `<body>`. Só usa recursos externos para as fontes Sora e Manrope (Google Fonts) e para o Supabase (via `fetch`, sem biblioteca). O JavaScript é compacto, com nomes curtos, e deve continuar nesse estilo.

Arquivos de apoio para a instalação no celular (PWA): `manifest.webmanifest`, `sw.js`, `icon.svg` (favicon), `icon-192.png`, `icon-512.png` (também usado como ícone "maskable") e `apple-touch-icon.png`. O `sw.js` só guarda arquivos da própria origem, sempre buscando primeiro a versão da rede (usa o cache apenas sem internet), e nunca intercepta as chamadas ao Supabase. Ele só é registrado quando a página é aberta por http(s), não por `file://`. Ao adicionar um arquivo que o app precise para abrir, inclua-o na lista `ARQ` do `sw.js` e troque a versão em `C` (ex.: `primefinance-v2`).

### Estado e persistência
- Todo o estado fica no objeto `S = {tx, bills, goals, recur, obj, rin}`, salvo como JSON no `localStorage` na chave `fin1-d-local` (`dk()`). Sempre chame `save()` depois de alterar `S`, e em seguida `render()`.
- Campos dos modelos: movimentação `{id, d (descrição), v (valor), t ('d' despesa | 'r' receita), c (categoria), dt ('AAAA-MM-DD'), rr?, ym?}`; receita fixa (`S.rin`) `{id, d, v, c, day, from ('AAAA-MM'), skip[]}`; conta `{id, d, v, dt, paid, rid?, ym?}`; conta fixa `{id, d, v, day, from ('AAAA-MM'), skip[]}`; `goals` mapeia categoria → limite mensal; objetivo `{id, n (nome), alvo, atual (valor guardado), prazo ('AAAA-MM-DD' ou '')}`. Os valores dos objetivos não geram transações. `fixS()` garante que todos os campos de `S` existam (use-a ao carregar dados).
- Tema, cor e nome ficam em chaves separadas: `fin2-tema` (`escuro|claro`), `fin2-cor` (`roxo|verde|azul|cinza`) e `fin2-nome` (nome exibido na saudação "Olá, nome" do painel). O script do `<head>` aplica esses valores antes da renderização para evitar flash. Se mudar a lógica de tema/cor, atualize esse script **e** as funções `setTema`/`setAccent`.

### Conta e sincronização (Supabase)
- Projeto Supabase `zkosgfeglpmfkdauqcwe`. O código usa só a chave **publishable** (`sb_publishable_...`), que pode ficar no código. **Nunca** coloque a chave `sb_secret_...` no repositório.
- Autenticação por REST (`/auth/v1/signup`, `/auth/v1/token`, `/auth/v1/logout`) na função `api()`. A sessão fica em `fin2-sessao` (`localStorage`) e é renovada por `fresh()`. Os erros do Supabase são traduzidos em português formal no objeto `ERR`.
- Os dados ficam na tabela `public.dados` (`user_id` uuid PK, `conteudo` jsonb com o objeto `S`, `atualizado`), com RLS: cada usuário só acessa a própria linha. Qualquer mudança nessa tabela deve manter o RLS ligado e as quatro políticas.
- `save()` grava o cache local (`fin1-d-<id do usuário>`) e chama `push()`, que envia `S` ao Supabase após 600 ms. Ao entrar (`entrar()`), a nuvem prevalece; se estiver vazia, os dados antigos de `fin1-d-local` são migrados uma única vez (`fin2-migrado`).
- Recuperação de senha: `#aforgot` chama `/auth/v1/recover` com `redirect_to` do próprio site. Ao voltar pelo link do e-mail, o `#access_token` do hash da URL é lido no início (`type=recovery` abre o modo `rec` da tela de entrada; outros tipos entram direto). Isso exige que o Site URL e as Redirect URLs do Supabase apontem para o endereço do site.
- A tela de entrada (`#auth`) aparece quando o `body` tem a classe `out`. Ao sair, o cache local do usuário é apagado.

### Fluxo de renderização
- `render()` redesenha tudo (painel, gráficos, listas) a partir de `S` e do mês selecionado em `#mes`. Não há atualização parcial.
- `go(view)` alterna entre as seções `v-painel`, `v-mov`, `v-contas`, `v-obj` e `v-cfg` (definidas em `NAV`/`TITLES`).
- Os cliques são tratados por um único listener em `document`, por atributos: `data-go` (navegação), `data-new` (nova movimentação) e `data-act` + `data-id` (`edit`, `deltx`, `pay`, `editbill`, `delbill`, `delrec`, `delrin`, `editobj`, `delobj`, `dep`, `ret`, `mes`). Botões novos devem seguir esse padrão.
- Todo conteúdo do usuário inserido via `innerHTML` deve passar por `esc()`.

### Regras de negócio que envolvem várias partes do código
- **Contas fixas:** `genRecur()` cria uma conta em `S.bills` para cada mês, de `from` até o mês atual, com o `rid` da conta fixa e o `ym`. Ao excluir uma conta gerada, o mês vai para `skip` da conta fixa para não ser recriado.
- **Receitas fixas:** a opção "Repetir mensalmente (receita fixa)" aparece no formulário de transações quando o tipo é Receita (só em lançamentos novos). `genRecur()` também cria, em `S.tx`, uma receita para cada mês de `from` em diante, com `rr` (id da receita fixa) e `ym`, mas **somente quando a data já chegou** (diferente das contas fixas, que são geradas para o mês inteiro). Ao excluir um lançamento gerado, `delTx()` coloca o mês em `skip`. Editar um lançamento gerado atualiza também a receita fixa (descrição, valor, categoria e dia). "Encerrar" (`delRin()`) remove a repetição e mantém os lançamentos já feitos.
- **Compras parceladas:** o campo "Número de parcelas" (1 a 48) aparece quando o tipo é Despesa, só em lançamentos novos. Com mais de uma parcela, `parcelas()` divide o valor total em centavos (a sobra vai para a última parcela) e cria uma despesa por mês, a partir da data informada, com a descrição "Nome (i/n)". As parcelas são transações comuns, sem campo extra no modelo. `tipoUI()` controla a exibição desses campos e o aviso `#tparn`.
- **Comparação com o mês anterior:** em `render()`, `#gasc` (cartão Despesas) compara o total de despesas com o mês anterior ao selecionado, e `cmpP()` coloca uma etiqueta de variação ao lado de cada categoria na legenda da rosca (omitida quando não há despesas na categoria no mês anterior ou quando a variação é 0%). Nomes dos meses: `nm` (abreviados) e `NMF` (completos).
- **Editar conta:** `editBillFn()` preenche o formulário de contas (só para contas não pagas). Em conta fixa, a alteração de nome, valor e dia vale também para a conta fixa e para as contas ainda não pagas dos meses seguintes.
- **Alerta de vencimentos:** em `render()`, `#avenc` lista as contas vencidas e as que vencem em até 3 dias (usa `dif()`).
- **Filtros de transações:** `#fq`, `#ft`, `#fc` e `#fall` filtram apenas a lista `#txs`; os totais do painel continuam sendo do mês selecionado.
- **Objetivos:** `editObjFn()`, `movObj()` (depósito e retirada) e a aba `v-obj`. Um novo campo em objetivo precisa entrar também em `$('fo').onsubmit`, na exportação e na restauração do backup.
- **Pagar conta:** `pay()` marca a conta como paga e cria uma despesa na categoria `Contas` com a data de hoje.
- **Categorias:** a lista `CATS` é fixa. A cor de cada categoria vem do índice (`--c1`…`--c8`) e o ícone vem de `ICO[nome]`. Para adicionar uma categoria, é preciso mexer nas três partes.
- **Backup:** o JSON exportado tem `app:'primefinance', versao:1`. A restauração (`$('rsf').onchange`) valida e **reconstrói campo a campo** cada registro, então qualquer campo novo no modelo precisa ser incluído na validação e no mapeamento da restauração, ou será descartado.
- **CSV:** usa `;` como separador, BOM UTF-8 e `csvCel()` para proteger contra injeção de fórmulas.

### Tema e layout
- As cores são variáveis CSS em `:root`. A cor de destaque usa `data-accent` e o tema usa `data-theme`. O tema é sempre escuro ou claro (não há modo automático): o script do `<head>` e `setTema` definem `data-theme` como `dark` ou `light` e ajustam a cor da `meta[name=theme-color]` (`#0a0a10` no escuro, `#f3f2f8` no claro), usada na barra do sistema quando o app está instalado.
- A barra de abas do celular tem 6 colunas (5 abas e o botão +). Rótulo curto da aba de configurações no celular: `s:'Ajustes'` em `NAV`. A barra some enquanto um campo está focado e volta 350 ms depois do `focusout`, para não cobrir o botão tocado.
- Breakpoints: abaixo de 960px aparece a barra de abas inferior (`.tabbar`); a partir de 960px aparece a barra lateral (`.side`); a partir de 1100px o painel usa 4 colunas.

## Dados pessoais

O `.gitignore` exclui os arquivos exportados pelo app (`primefinance-backup-*.json`, `primefinance-movimentacoes-*.csv`). Não adicione esses arquivos ao repositório.
