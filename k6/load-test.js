import http from 'k6/http';
import { check, sleep } from 'k6';

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

const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const health = http.get(`${baseUrl}/health`);
  check(health, {
    'health status is 200': (r) => r.status === 200,
  });

  const users = http.get(`${baseUrl}/users?limit=10`);
  check(users, {
    'users status is 200': (r) => r.status === 200,
  });

  const user = http.get(`${baseUrl}/users/1`);
  check(user, {
    'user status is 200': (r) => r.status === 200,
  });

  const payload = JSON.stringify({
    customerId: 1,
    items: [{ sku: 'BOOK-1', qty: 2 }],
  });

  const order = http.post(`${baseUrl}/orders`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(order, {
    'order status is 201': (r) => r.status === 201,
  });

  sleep(1);
}
