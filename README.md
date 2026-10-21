# Primefinance

Aplicativo simples de controle financeiro pessoal. Mostra quanto você gastou, quanto recebeu e o que ainda precisa pagar, com gráficos e metas por categoria.

Funciona direto no navegador, no celular, no tablet e no computador. Não precisa instalar nada.

## O que ele faz

- **Movimentações:** lançar, editar e apagar gastos e receitas, com categoria e data.
- **Resumo do mês:** receitas, gastos, saldo e quanto ainda falta pagar, com um aviso quando as despesas passam dos ganhos.
- **Contas a pagar:** com vencimento, destaque para contas vencidas e botão para marcar como paga (a conta vira um gasto).
- **Contas fixas:** contas que se repetem todo mês, no mesmo dia.
- **Metas por categoria:** limite mensal por categoria, com barra de progresso e aviso ao estourar.
- **Gráficos:** gastos por categoria (rosca) e comparação dos últimos 6 meses.
- **Backup e planilha:** baixar e restaurar um backup, e exportar as movimentações em CSV.
- **Aparência:** escolha da cor dos botões e do fundo.
- **Layout adaptável:** uma coluna no celular, duas colunas em telas grandes.

## Como usar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador (dois cliques).

Para publicar na internet, basta hospedar o `index.html` em qualquer serviço de sites estáticos, como o Netlify ou o GitHub Pages.

## Seus dados

Os dados ficam salvos **apenas no navegador** de quem usa (`localStorage`). Nada é enviado para servidor nenhum.

Isso significa que:

- limpar o navegador, trocar de aparelho ou apagar o atalho faz os dados serem perdidos;
- cada aparelho tem os próprios dados.

Use o botão **Baixar backup**, em Configurações, de vez em quando.

## Estrutura do projeto

```
primefinance/
├── index.html   # o app inteiro: estrutura (HTML), aparência (CSS) e lógica (JavaScript)
├── README.md    # esta apresentação
└── .gitignore   # arquivos que o Git deve ignorar
```

O app é um arquivo único e não usa bibliotecas externas.

## Próximos passos

- Login e dados salvos na nuvem, com Supabase, para acessar de qualquer aparelho.
- Comparação com o mês anterior e resumo do ano.
- Busca e filtros nas movimentações.
- Categorias personalizadas.
- Alerta de contas a vencer.
