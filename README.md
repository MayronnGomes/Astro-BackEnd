# Astro: API (back-end)

API do **Sistema Astro**, plataforma de gestão de **ações e atividades de extensão** do Campus Russas da UFC. Cada ação (programa ou projeto) tem coordenador, membros, atividades com datas, prioridade e status, notificações e histórico de mensagens.

Front-end: [Astro-FrontEnd](https://github.com/MayronnGomes/Astro-FrontEnd).

## Tecnologias

Node.js · Express · Sequelize (migrations e seeders) · MySQL · JWT · bcryptjs · express-validator · Nodemailer

## Funcionalidades

- Login de usuários da instituição e de **membros externos**, com token JWT.
- Ações de extensão em hierarquia (programa → projeto), com coordenador.
- Atividades com período, local, **prioridade** e **status**, além do tempo de cada atividade.
- Membros da ação: listar, criar e remover.
- Notificações por usuário (ler e excluir) e histórico de mensagens.
- Envio de e-mail pela API.

## Modelo de dados

`usuario` · `acao_extensao` (com `parentId` e coordenador) · `atividade` · `acao_extensao_usuario` · `atividades_usuario` · `notificacoes` · `historico_mensagens`

## Principais rotas

| Método | Rota | Para quê |
| --- | --- | --- |
| POST | `/login`, `/login-external` | Autenticação |
| GET | `/acoesExtensao/:id_user` | Ações do usuário |
| GET/POST/DELETE | `/atividades`, `/atividade` | Consultar, criar e remover atividades |
| POST | `/atividadesStatus/:id`, `/atividadeUpdate`, `/atividadeTime` | Atualizar status, dados e tempo |
| GET/POST/DELETE | `/membros`, `/userCreate` | Membros |
| GET/POST/DELETE | `/notifications/:id_user`, `/notificationsStatus/:id` | Notificações |
| POST | `/mensagens` | Histórico de mensagens |

## Como rodar

Requisitos: Node.js e MySQL.

```bash
npm install
cp .env.example .env     # preencha banco, e-mail e chave da API
npm run setup            # cria o banco e roda migrations e seeders
npm run dev              # servidor em modo desenvolvimento
```

Variáveis em `.env.example`: `PORT`, `API_KEY`, `DB_*` (host, porta, nome, usuário, senha) e `MAIL_*` (serviço, usuário, senha).

## Estrutura

```
src/
  controllers/   regras de cada recurso
  models/        modelos Sequelize
  migrations/    esquema do banco
  config/        autenticação, banco e e-mail
  routes.js      rotas
seeders/         dados iniciais
```

## Autor

Mayronn Gomes Viana. Projeto desenvolvido no contexto da UFC Campus Russas.
