# Gerenciador de tarefas com React

Aplicação de estudo para cadastrar, concluir, excluir e consultar detalhes de tarefas no navegador.

## Funcionalidades

- Cadastro de título e descrição, com verificação de campos vazios.
- Marcação de tarefas concluídas e exclusão de tarefas.
- Tela de detalhes com navegação pelo React Router.
- Persistência da lista no `localStorage` do navegador, na chave `tasks`.

## Tecnologias

React 18, JavaScript/JSX, Vite, React Router, Tailwind CSS, UUID e Lucide React.

## Executar localmente

Instale o Node.js com npm. Na pasta do projeto:

```bash
npm install
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

Esse roteiro é uma proposta de conferência manual; esta atualização de documentação não constitui um novo teste de execução.

## Escopo e próximos passos

Os dados ficam no navegador utilizado. Não há backend, autenticação ou sincronização entre dispositivos. O exemplo de consulta à JSONPlaceholder em `App.jsx` está desativado e não é uma integração ativa da aplicação.

A persistência ainda precisa de tratamento para conteúdo inválido ou indisponibilidade do armazenamento. A versão atual não publica uma suíte de testes automatizados.

## Contexto de estudo

O código foi desenvolvido durante o aprendizado de React. Há uma referência ao [vídeo de estudo](https://youtu.be/2RWsLmu8yVc?t=7369) em `App.jsx`. O objetivo do portfólio é compreender o fluxo, explicar as decisões e evoluir a aplicação com melhorias próprias e revisadas.
