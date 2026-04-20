import http from 'k6/http';
import { baseUrl } from '../../config/env.js';

export function getHealth() {
  return http.get(${baseUrl}/test);
}

export function getProducts(limit = 10) {
  return http.get(${baseUrl}/products?limit=);
}

export function getProductById(id) {
  return http.get(${baseUrl}/products/);
}

export function addProduct(payload) {
  return http.post(${baseUrl}/products/add, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}
