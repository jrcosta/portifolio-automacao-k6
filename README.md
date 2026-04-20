# 🚀 Portfólio de Automação: K6 Load Testing

Este projeto é um laboratório focado em **Testes de Carga e Performance** utilizando a ferramenta [k6](https://k6.io/). O repositório simula tráfegos pesados sobre a API pública **DummyJSON** para validar cenários de throughput, latência e estabilidade, adotando padrões avançados de escalabilidade de automação.

## 🏗️ Arquitetura e Padrões (Domain-Driven)

Diferente de scripts k6 comuns orientados a tutoriais, este laboratório aplica divisões estruturais focadas no princípio de alta manutenibilidade, separando perfeitamente as responsabilidades.

`	ext
load-tests-k6/
├── src/
│   ├── config/          # Definições de ambiente (env), thresholds da carga e estágios
│   ├── modules/
│   │   └── products/    # Domínio testado. Isola a responsabilidade do módulo:
│   │       ├── products.client.js   # Integrações com API HTTP
│   │       ├── products.checks.js   # Asserções independentes
│   │       ├── products.payload.js  # Geradores de Massa
│   │       └── products.scenario.js # Maestro: orquestra chamadas e asserções 
│   ├── utils/           # Handlers como o Reporter HTML
│   └── main.js          # Ponto de entrada leve (Entrypoint)
`

## 📊 Relatório Visual 

Em conjunto ao CLI cru, acoplamos a lib **k6-reporter** no handler (handleSummary) para garantir que os resultados do throughput tornem-se relatórios gráficos baseados no design do **Grafana** (porém de maneira "serverless", gerando o painel dinâmico index.html). 
Garantido e publicado autonomamente nas hospedagens do repositório via automações **CI/CD (ctions/github-pages)** a cada novidade na master.

## 🕹️ Como executar

1. Instale o Node.JS e confira se possui o cli oficial do [k6 instalado na máquina](https://k6.io/docs/get-started/installation/).
2. Rode no console partindo da raiz deste código:
`ash
k6 run src/main.js
`
O console fluirá os resultados instantaneamente, enquanto finaliza com o drop do dashboard visual no próprio repositório.

## 🔗 Sobre o Monorepo

> [!NOTE] 
> O código original deste teste compõe uma parte acoplada do meu [Portfólio Interativo Web principal](https://github.com/jrcosta/portifolio-web). Foi modularizado via *Git Submodules* para provar independência e ao mesmo tempo integridade no ecossistema final.
