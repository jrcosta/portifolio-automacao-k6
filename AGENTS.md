# Repository Guidelines

## Project Structure & Module Organization

This submodule contains k6 load testing scripts.

- `k6/load-test.js`: main load test scenario.
- `package.json`: npm metadata and load-test script.
- `.github/`: CI workflow configuration when present.

## Build, Test, and Development Commands

```bash
npm install
npm run test:load
```

`npm run test:load` executes `k6 run k6/load-test.js`.

```bash
BASE_URL=http://localhost:3000 k6 run k6/load-test.js
```

Runs the same scenario against a custom target URL.

## Coding Style & Naming Conventions

Keep k6 scripts small and scenario-focused. Use descriptive function names, explicit thresholds, and environment variables such as `BASE_URL` for target configuration. Name new scripts with kebab-case, for example `checkout-load-test.js`.

## Testing Guidelines

Load tests should define clear checks, thresholds, and virtual-user behavior. Avoid hardcoded production targets unless the purpose is explicit. Prefer smoke-level load locally before increasing duration or VUs.

## Commit & Pull Request Guidelines

Use short imperative commits, for example `Add product API load scenario`. Pull requests should state target URL, duration, VUs, thresholds, and a summary of observed results.

## Safety Notes

Do not run aggressive load profiles against third-party or production services without approval. Keep default scenarios conservative.
