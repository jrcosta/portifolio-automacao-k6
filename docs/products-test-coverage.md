# Cobertura dos testes de produtos na DummyJSON

Este documento descreve o proposito de cada fluxo executado em `src/modules/products/products.scenario.js`.

O objetivo da automacao nao e apenas verificar se a API respondeu, mas tambem validar contratos basicos das respostas: status HTTP, formato do JSON, campos obrigatorios, filtros aplicados e erro esperado.

## 1. Health check da API

- Chamada: `GET /test`
- Funcao client: `getHealth`
- Funcao de validacao: `validateHealth`

Proposito:

Confirma que a API esta acessivel antes dos demais fluxos do cenario.

Checks executados:

- A resposta deve retornar status `200`.
- O corpo deve informar `status: "ok"`.
- O corpo deve informar que o metodo recebido foi `GET`.

## 2. Listagem de produtos

- Chamada: `GET /products?limit=10`
- Funcao client: `getProducts`
- Funcao de validacao: `validateProducts`

Proposito:

Valida o endpoint principal de listagem de produtos e garante que o parametro `limit` esta sendo respeitado.

Checks executados:

- A resposta deve retornar status `200`.
- O corpo deve conter uma colecao `products`.
- O campo `limit` deve ser igual ao limite solicitado.
- Todos os produtos retornados devem ter dados minimos validos: `id`, `title` e `price`.

## 3. Consulta de produto por ID

- Chamada: `GET /products/1`
- Funcao client: `getProductById`
- Funcao de validacao: `validateProduct`

Proposito:

Garante que a API consegue retornar um produto especifico pelo identificador.

Checks executados:

- A resposta deve retornar status `200`.
- O produto retornado deve ter o mesmo `id` solicitado.
- O produto deve ter campos obrigatorios validos: `id`, `title` e `price`.

## 4. Busca de produtos por termo

- Chamada: `GET /products/search?q=phone`
- Funcao client: `searchProducts`
- Funcao de validacao: `validateProductSearch`

Proposito:

Valida o mecanismo de busca de produtos por texto.

Checks executados:

- A resposta deve retornar status `200`.
- A busca deve retornar pelo menos um produto.
- Todos os itens retornados devem ter dados minimos validos.

## 5. Consulta de categorias com metadados

- Chamada: `GET /products/categories`
- Funcao client: `getProductCategories`
- Funcao de validacao: `validateProductCategories`

Proposito:

Valida a lista de categorias no formato completo, com metadados de cada categoria.

Checks executados:

- A resposta deve retornar status `200`.
- O corpo deve ser uma lista.
- Cada categoria deve conter `slug`, `name` e `url`.

## 6. Consulta de slugs de categorias

- Chamada: `GET /products/category-list`
- Funcao client: `getProductCategoryList`
- Funcao de validacao: `validateProductCategoryList`

Proposito:

Valida a lista simplificada de categorias, usada quando o consumidor precisa apenas dos slugs.

Checks executados:

- A resposta deve retornar status `200`.
- O corpo deve ser uma lista de strings.
- A lista deve conter a categoria esperada `smartphones`.

## 7. Listagem por categoria

- Chamada: `GET /products/category/smartphones?limit=5`
- Funcao client: `getProductsByCategory`
- Funcao de validacao: `validateProductsByCategory`

Proposito:

Garante que o filtro por categoria retorna apenas produtos da categoria solicitada.

Checks executados:

- A resposta deve retornar status `200`.
- O corpo deve conter uma colecao `products`.
- Todos os produtos retornados devem ter `category: "smartphones"`.

## 8. Criacao simulada de produto

- Chamada: `POST /products/add`
- Funcao client: `addProduct`
- Funcao de validacao: `validateProductAdd`

Proposito:

Valida o fluxo de criacao simulada da DummyJSON. A API nao persiste o produto de verdade, mas deve responder como se tivesse criado.

Checks executados:

- A resposta deve retornar status `200` ou `201`.
- O corpo deve retornar um `id` numerico.
- O corpo deve refletir os dados enviados no payload, como `title` e `price`.

## 9. Produto inexistente

- Chamada: `GET /products/999999`
- Funcao client: `getMissingProduct`
- Funcao de validacao: `validateMissingProduct`

Proposito:

Valida o comportamento negativo da API quando o produto nao existe.

Checks executados:

- A resposta deve retornar status `404`.
- O corpo deve retornar uma mensagem de erro.

Observacao:

Esse fluxo usa `http.expectedStatuses(404)` no client para que o k6 trate o `404` como resposta esperada. Sem isso, o teste negativo contaminaria a metrica `http_req_failed`.

## Carga configurada

A carga padrao em `src/config/options.js` sobe ate 5 usuarios virtuais.

Esse limite foi escolhido porque a DummyJSON e uma API publica. Cargas maiores, como 50 usuarios virtuais executando todos esses endpoints por iteracao, tendem a medir limite ou instabilidade da API publica em vez de medir a qualidade da automacao.
