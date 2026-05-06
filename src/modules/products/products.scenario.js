import { sleep } from 'k6';
import {
  getHealth,
  getProducts,
  getProductById,
  searchProducts,
  getProductCategories,
  getProductCategoryList,
  getProductsByCategory,
  getMissingProduct,
  addProduct,
} from './products.client.js';
import {
  validateHealth,
  validateProducts,
  validateProduct,
  validateProductSearch,
  validateProductCategories,
  validateProductCategoryList,
  validateProductsByCategory,
  validateProductAdd,
  validateMissingProduct,
} from './products.checks.js';
import { buildProductPayload } from './products.payload.js';

export default function productsScenario() {
  const productLimit = 10;
  const productId = 1;
  const searchTerm = 'phone';
  const category = 'smartphones';

  const healthResponse = getHealth();
  validateHealth(healthResponse);

  const productsResponse = getProducts(productLimit);
  validateProducts(productsResponse, productLimit);

  const productResponse = getProductById(productId);
  validateProduct(productResponse, productId);

  const searchResponse = searchProducts(searchTerm);
  validateProductSearch(searchResponse);

  const categoriesResponse = getProductCategories();
  validateProductCategories(categoriesResponse);

  const categoryListResponse = getProductCategoryList();
  validateProductCategoryList(categoryListResponse, category);

  const productsByCategoryResponse = getProductsByCategory(category);
  validateProductsByCategory(productsByCategoryResponse, category);

  const payload = buildProductPayload();
  const addProductResponse = addProduct(payload);
  validateProductAdd(addProductResponse, payload);

  const missingProductResponse = getMissingProduct();
  validateMissingProduct(missingProductResponse);

  sleep(1);
}
