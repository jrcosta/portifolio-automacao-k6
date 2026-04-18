const express = require('express');

const app = express();
app.use(express.json());

const users = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User-${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const randomDelay = (min = 20, max = 120) =>
  new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

app.get('/health', async (_req, res) => {
  await randomDelay(5, 20);
  res.status(200).json({ status: 'ok', service: 'k6-demo-api' });
});

app.get('/users', async (req, res) => {
  await randomDelay();
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  res.status(200).json({ total: users.length, data: users.slice(0, limit) });
});

app.get('/users/:id', async (req, res) => {
  await randomDelay();
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
});

app.post('/orders', async (req, res) => {
  await randomDelay(40, 180);
  const { customerId, items } = req.body;

  if (!customerId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid payload: customerId and items are required' });
  }

  return res.status(201).json({
    id: `ord-${Date.now()}`,
    customerId,
    itemCount: items.length,
    status: 'created',
  });
});

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`k6 demo API running at http://localhost:${port}`);
  });
}

module.exports = app;
