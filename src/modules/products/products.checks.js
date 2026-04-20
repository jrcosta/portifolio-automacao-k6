import { check } from 'k6';

export function validateHealth(response) {
  return check(response, {
    'health/test status is 200': (r) => r.status === 200,
  });
}

export function validateProducts(response) {
  return check(response, {
    'products status is 200': (r) => r.status === 200,
  });
}

export function validateProduct(response) {
  return check(response, {
    'product status is 200': (r) => r.status === 200,
  });
}

export function validateProductAdd(response) {
  return check(response, {
    'product add status is 200/201': (r) => r.status === 200 || r.status === 201,
  });
}
