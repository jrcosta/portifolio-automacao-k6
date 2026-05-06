import http from 'k6/http';
import { baseUrl } from '../../config/env.js';

export function getHealth() {
  return http.get(`${baseUrl}/test`);
}

export function getProducts(limit = 10) {
  return http.get(`${baseUrl}/products?limit=${limit}`);
}

export function getProductById(id) {
  return http.get(`${baseUrl}/products/${id}`);
}

export function searchProducts(query) {
  return http.get(`${baseUrl}/products/search?q=${encodeURIComponent(query)}`);
}

export function getProductCategories() {
  return http.get(`${baseUrl}/products/categories`);
}

export function getProductCategoryList() {
  return http.get(`${baseUrl}/products/category-list`);
}

export function getProductsByCategory(category, limit = 5) {
  return http.get(`${baseUrl}/products/category/${category}?limit=${limit}`);
}

export function getMissingProduct(id = 999999) {
  return http.get(`${baseUrl}/products/${id}`, {
    responseCallback: http.expectedStatuses(404),
  });
}

export function addProduct(payload) {
  return http.post(`${baseUrl}/products/add`, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
}
