# Gerenciador de tarefas com React

Aplicação de estudo para cadastrar, concluir, excluir e consultar detalhes de tarefas no navegador.

## Funcionalidades

- Cadastro por formulário com rótulos, envio por Enter, limites de tamanho e validação de espaços em branco.
- Busca por título/descrição e filtros por situação, sem alterar a lista persistida.
- Contador de pendências e nomes acessíveis para os botões de detalhes e exclusão.
- Marcação de tarefas concluídas e exclusão de tarefas.
- Tela de detalhes com navegação pelo React Router.
- Persistência da lista no `localStorage` do navegador, na chave `tasks`.

## Tecnologias

React 18, JavaScript/JSX, Vite 7, React Router 7, Tailwind CSS 3, UUID 11 e Lucide React.

## Executar localmente

Instale Node.js 22.12+ com npm. Na pasta do projeto:

```bash
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite no terminal. Para gerar a versão de distribuição e conferi-la localmente:

```bash
npm run build
npm run preview
```

## Organização e fluxo

- `src/App.jsx`: estado das tarefas e operações de cadastro, conclusão, exclusão e persistência.
- `src/components/AddTask.jsx`: entrada e validação inicial de título e descrição.
- `src/components/Tasks.jsx`: listagem e ações de cada tarefa.
- `src/pages/TaskPage.jsx`: detalhes da tarefa.
- `src/main.jsx`: rotas `/` e `/task`.

O formulário chama a função de cadastro em `App`, que cria um identificador com UUID e atualiza o estado. Um efeito salva a lista no navegador. A tela de detalhes recebe título e descrição pela URL.

## Roteiro de demonstração

1. Adicione uma tarefa com dados fictícios e confira a listagem.
2. Atualize a página e verifique a persistência no mesmo navegador.
3. Marque a tarefa como concluída e abra os detalhes.
4. Volte para a lista, exclua a tarefa e atualize a página.
5. Tente cadastrar com um dos campos vazio e observe a validação.

O roteiro orienta a conferência manual e complementa os testes automatizados.

## Escopo e próximos passos

Os dados ficam no navegador utilizado. Não há backend, autenticação ou sincronização entre dispositivos. O exemplo desativado de JSONPlaceholder foi removido; a aplicação não consulta um backend.

O armazenamento é validado antes da renderização. Se o JSON estiver corrompido ou não contiver uma lista válida, a aplicação abre com uma lista vazia e um aviso, preservando o conteúdo anterior. As tarefas novas ficam apenas na sessão nesse caso. Falhas de acesso ou falta de espaço também exibem aviso, sem interromper o uso da tela.

Para recuperar dados antigos, preserve uma cópia do valor da chave `tasks` antes de corrigi-lo no navegador. A aplicação não apaga nem redefine esse conteúdo automaticamente.

## Testes de regressão

Com Node.js 22.12 ou superior:

```bash
npm test
npm run lint
npm run build
```

Os testes usam `node:test`, sem biblioteca adicional, e cobrem dados válidos, JSON corrompido, formato inesperado, preservação do conteúdo e falhas de leitura/escrita. Eles validam a camada de armazenamento; não substituem a conferência manual das telas.

## Contexto de estudo

O código foi desenvolvido durante o aprendizado de React. Há uma referência ao [vídeo de estudo](https://youtu.be/2RWsLmu8yVc?t=7369) em `App.jsx`. O objetivo do portfólio é compreender o fluxo, explicar as decisões e evoluir a aplicação com melhorias próprias e revisadas.

## Verificações desta evolução

20 testes da camada de armazenamento e filtros; lint e compilação de produção. O CI executa as mesmas verificações. Os testes unitários não cobrem interação real com a tela.

As dependências foram atualizadas, incluindo Vite 7, React Router 7 e UUID 11. A auditoria de produção não encontrou vulnerabilidades conhecidas no momento da verificação. A auditoria completa ainda aponta três alertas moderados na cadeia de desenvolvimento do Tailwind 3/PostCSS; migrar para Tailwind 4 exige revisão visual e fica como próximo ajuste, sem aplicar correções forçadas.

Conferência manual no navegador: cadastro por Enter, busca por descrição, conclusão, filtro de pendentes, navegação de detalhes, retorno à lista e persistência após recarregar.
