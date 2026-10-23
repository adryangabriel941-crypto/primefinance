# Primefinance

Aplicativo simples de controle financeiro pessoal. Mostra quanto você gastou, quanto recebeu e o que ainda precisa pagar, com gráficos e metas por categoria.

Funciona direto no navegador, no celular, no tablet e no computador. Não precisa instalar nada.

## O que ele faz

- **Movimentações:** lançar, editar e apagar gastos e receitas, com categoria e data.
- **Resumo do mês:** receitas, gastos, saldo e quanto ainda falta pagar, com um aviso quando as despesas passam dos ganhos.
- **Comparação com o mês anterior:** quanto as despesas subiram ou caíram no total e em cada categoria.
- **Compras parceladas:** informe o valor total e o número de parcelas; cada parcela é lançada no mês correspondente.
- **Receitas fixas:** salário e outras receitas que se repetem todo mês são lançados automaticamente na data.
- **Busca e filtros:** procurar transações por descrição, tipo e categoria, no mês ou em todos os meses.
- **Alerta de vencimentos:** aviso no painel das contas vencidas e das que vencem em até 3 dias.
- **Objetivos de economia:** metas como "reserva de emergência", com prazo opcional, depósitos, retiradas e sugestão de valor mensal.
- **Contas a pagar:** com vencimento, edição das informações, destaque para contas vencidas e botão para marcar como paga (a conta vira um gasto).
- **Contas fixas:** contas que se repetem todo mês, no mesmo dia.
- **Metas por categoria:** limite mensal por categoria, com barra de progresso e aviso ao estourar.
- **Gráficos:** gastos por categoria (rosca) e comparação dos últimos 6 meses.
- **Conta:** login com e-mail e senha e dados sincronizados na nuvem.
- **Backup e planilha:** baixar e restaurar um backup, e exportar as movimentações em CSV.
- **Aparência:** tema escuro (padrão) ou claro, com cor de destaque roxa, verde, azul ou cinza.
- **Layout adaptável:** barra de abas no celular e barra lateral no computador e no tablet.
- **Instalar no celular:** o app pode ser adicionado à tela inicial, com ícone próprio, e abre mesmo sem internet.

## Como usar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador (dois cliques).

Para publicar na internet, basta hospedar o `index.html` em qualquer serviço de sites estáticos, como o Netlify ou o GitHub Pages.

## Seus dados

Cada pessoa cria uma conta com e-mail e senha. Os dados ficam salvos na conta (Supabase) e só a própria pessoa tem acesso a eles. Um cache fica no navegador para o app abrir rápido.

Isso significa que:

- é possível entrar em outro aparelho e ver os mesmos dados;
- sem internet, o app mostra os dados salvos no aparelho e sincroniza quando a conexão voltar.

Se esquecer a senha, use o link **Esqueci minha senha** na tela de entrada.

Mesmo assim, use o botão **Baixar cópia de segurança**, em Configurações, de vez em quando.

## Estrutura do projeto

```
primefinance/
├── index.html            # o app inteiro: estrutura (HTML), aparência (CSS) e lógica (JavaScript)
├── manifest.webmanifest  # nome, cores e ícones para instalar no celular
├── sw.js                 # permite abrir o app sem internet (guarda só os arquivos do site)
├── icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png  # ícones
├── README.md             # esta apresentação
└── .gitignore   # arquivos que o Git deve ignorar
```

A lógica do app está toda no `index.html`, que não usa bibliotecas externas (apenas as fontes Sora e Manrope, do Google Fonts, com fonte de reserva do sistema).

## Próximos passos

- Tela de dicas personalizadas, com base nos próprios números do usuário.
- Resumo do ano.
- Categorias personalizadas.
