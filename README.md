# Primefinance

Aplicativo simples de controle financeiro pessoal. Mostra quanto você gastou, quanto recebeu e o que ainda precisa pagar, com gráficos e metas por categoria.

Funciona direto no navegador, no celular, no tablet e no computador. Não precisa instalar nada.

## O que ele faz

- **Movimentações:** lançar, editar e apagar gastos e receitas, com categoria e data.
- **Resumo do mês:** receitas, gastos, saldo e quanto ainda falta pagar, com um aviso quando as despesas passam dos ganhos.
- **Contas a pagar:** com vencimento, edição das informações, destaque para contas vencidas e botão para marcar como paga (a conta vira um gasto).
- **Contas fixas:** contas que se repetem todo mês, no mesmo dia.
- **Metas por categoria:** limite mensal por categoria, com barra de progresso e aviso ao estourar.
- **Gráficos:** gastos por categoria (rosca) e comparação dos últimos 6 meses.
- **Conta:** login com e-mail e senha e dados sincronizados na nuvem.
- **Backup e planilha:** baixar e restaurar um backup, e exportar as movimentações em CSV.
- **Aparência:** tema escuro (padrão) ou claro, com cor de destaque roxa, verde, azul ou cinza.
- **Layout adaptável:** barra de abas no celular e barra lateral no computador e no tablet.

## Como usar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador (dois cliques).

Para publicar na internet, basta hospedar o `index.html` em qualquer serviço de sites estáticos, como o Netlify ou o GitHub Pages.

## Seus dados

Cada pessoa cria uma conta com e-mail e senha. Os dados ficam salvos na conta (Supabase) e só a própria pessoa tem acesso a eles. Um cache fica no navegador para o app abrir rápido.

Isso significa que:

- é possível entrar em outro aparelho e ver os mesmos dados;
- sem internet, o app mostra os dados salvos no aparelho e sincroniza quando a conexão voltar.

Mesmo assim, use o botão **Baixar cópia de segurança**, em Configurações, de vez em quando.

## Estrutura do projeto

```
primefinance/
├── index.html   # o app inteiro: estrutura (HTML), aparência (CSS) e lógica (JavaScript)
├── README.md    # esta apresentação
└── .gitignore   # arquivos que o Git deve ignorar
```

O app é um arquivo único e não usa bibliotecas externas (apenas as fontes Sora e Manrope, do Google Fonts, com fonte de reserva do sistema).

## Próximos passos

- Comparação com o mês anterior e resumo do ano.
- Busca e filtros nas movimentações.
- Categorias personalizadas.
- Alerta de contas a vencer.
