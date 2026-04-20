import { sleep } from 'k6';
import {
  getHealth,
  getProducts,
  getProductById,
  addProduct,
} from './products.client.js';
import {
  validateHealth,
  validateProducts,
  validateProduct,
  validateProductAdd,
} from './products.checks.js';
import { buildProductPayload } from './products.payload.js';

export default function productsScenario() {
  const healthResponse = getHealth();
  validateHealth(healthResponse);

  const productsResponse = getProducts(10);
  validateProducts(productsResponse);

  const productResponse = getProductById(1);
  validateProduct(productResponse);

  const payload = buildProductPayload();
  const addProductResponse = addProduct(payload);
  validateProductAdd(addProductResponse);

  sleep(1);
}
