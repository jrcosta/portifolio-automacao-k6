import productsScenario from './modules/products/products.scenario.js';
import { options as configOptions } from './config/options.js';
import { handleSummary as summaryHelper } from './utils/summary.js';

export const options = configOptions;

export function handleSummary(data) {
  return summaryHelper(data);
}

export default function () {
  productsScenario();
}
