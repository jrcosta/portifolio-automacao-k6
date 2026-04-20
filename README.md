# portifolio-automacao-k6

API simples para laboratório de testes de carga com **k6**.

## Objetivo

Fornecer uma API leve e previsível para executar testes de carga e validar cenários de throughput, latência e taxa de erro.

## Endpoints

- `GET /health` — health check
- `GET /users?limit=10` — lista de usuários
- `GET /users/:id` — detalha usuário por id
- `POST /orders` — cria pedido simples

## Requisitos

- Node.js 20+
- k6 instalado localmente (opcional para executar carga)

## Como executar

1. Instale dependências:

```bash
npm install
```

2. Suba a API:

```bash
npm start
```

A API ficará em `http://localhost:3000`.

## Smoke test rápido

```bash
npm run test:smoke
```

Esse comando sobe a API em porta aleatória, valida endpoints principais e encerra automaticamente.

## Teste de carga com k6

```bash
k6 run k6/load-test.js
```

Opcional (target customizado):

```bash
BASE_URL=http://localhost:3000 k6 run k6/load-test.js
```
