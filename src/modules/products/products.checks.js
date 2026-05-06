import { check } from 'k6';

function parseJson(response) {
  try {
    return response.json();
  } catch {
    return null;
  }
}

function isProduct(product) {
  return Boolean(
    product &&
      typeof product.id === 'number' &&
      typeof product.title === 'string' &&
      product.title.length > 0 &&
      typeof product.price === 'number' &&
      product.price > 0
  );
}

function hasProductsCollection(body) {
  return Boolean(body && Array.isArray(body.products));
}

export function validateHealth(response) {
  const body = parseJson(response);

  return check(response, {
    'health/test status is 200': (r) => r.status === 200,
    'health/test returns ok': () => body?.status === 'ok',
    'health/test reports GET method': () => body?.method === 'GET',
  });
}

export function validateProducts(response, expectedLimit) {
  const body = parseJson(response);

  return check(response, {
    'products status is 200': (r) => r.status === 200,
    'products returns a collection': () => hasProductsCollection(body),
    'products respects requested limit': () => body?.limit === expectedLimit,
    'products contains valid product data': () =>
      hasProductsCollection(body) && body.products.length > 0 && body.products.every(isProduct),
  });
}

export function validateProduct(response, expectedId) {
  const body = parseJson(response);

  return check(response, {
    'product status is 200': (r) => r.status === 200,
    'product has requested id': () => body?.id === expectedId,
    'product has required fields': () => isProduct(body),
  });
}

export function validateProductSearch(response) {
  const body = parseJson(response);

  return check(response, {
    'product search status is 200': (r) => r.status === 200,
    'product search returns products': () =>
      hasProductsCollection(body) && body.total > 0 && body.products.length > 0,
    'product search items have valid data': () =>
      hasProductsCollection(body) && body.products.every(isProduct),
  });
}

export function validateProductCategories(response) {
  const body = parseJson(response);

  return check(response, {
    'product categories status is 200': (r) => r.status === 200,
    'product categories returns category objects': () =>
      Array.isArray(body) &&
      body.length > 0 &&
      body.every(
        (category) =>
          typeof category.slug === 'string' &&
          typeof category.name === 'string' &&
          typeof category.url === 'string'
      ),
  });
}

export function validateProductCategoryList(response, expectedCategory) {
  const body = parseJson(response);

  return check(response, {
    'product category list status is 200': (r) => r.status === 200,
    'product category list returns slugs': () =>
      Array.isArray(body) && body.length > 0 && body.every((category) => typeof category === 'string'),
    'product category list contains expected category': () =>
      Array.isArray(body) && body.includes(expectedCategory),
  });
}

export function validateProductsByCategory(response, expectedCategory) {
  const body = parseJson(response);

  return check(response, {
    'products by category status is 200': (r) => r.status === 200,
    'products by category returns a collection': () => hasProductsCollection(body),
    'products by category matches requested category': () =>
      hasProductsCollection(body) &&
      body.products.length > 0 &&
      body.products.every((product) => product.category === expectedCategory),
  });
}

export function validateProductAdd(response, expectedPayload) {
  const body = parseJson(response);

  return check(response, {
    'product add status is 200/201': (r) => r.status === 200 || r.status === 201,
    'product add returns created id': () => typeof body?.id === 'number',
    'product add echoes payload': () =>
      body?.title === expectedPayload.title && body?.price === expectedPayload.price,
  });
}

export function validateMissingProduct(response) {
  const body = parseJson(response);

  return check(response, {
    'missing product status is 404': (r) => r.status === 404,
    'missing product returns error message': () => typeof body?.message === 'string',
  });
}
