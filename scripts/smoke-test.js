const app = require('../src/server');

async function run() {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const health = await fetch(`${baseUrl}/health`);
    const users = await fetch(`${baseUrl}/users?limit=5`);
    const order = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ customerId: 1, items: [{ sku: 'BOOK-1', qty: 1 }] }),
    });

    if (health.status !== 200 || users.status !== 200 || order.status !== 201) {
      throw new Error(`Unexpected statuses: ${health.status}/${users.status}/${order.status}`);
    }

    console.log('API smoke test OK');
  } finally {
    server.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
