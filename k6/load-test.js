import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "index.html": htmlReport(data),
  };
}

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '40s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

const baseUrl = __ENV.BASE_URL || 'https://dummyjson.com';

export default function () {
  const health = http.get(`${baseUrl}/test`);
  check(health, {
    'health/test status is 200': (r) => r.status === 200,
  });

  const products = http.get(`${baseUrl}/products?limit=10`);
  check(products, {
    'products status is 200': (r) => r.status === 200,
  });

  const product = http.get(`${baseUrl}/products/1`);
  check(product, {
    'product status is 200': (r) => r.status === 200,
  });

  const payload = JSON.stringify({
    title: 'BMW Pencil',
    price: 10
  });

  const productAdd = http.post(`${baseUrl}/products/add`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(productAdd, {
    'product add status is 200/201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}
