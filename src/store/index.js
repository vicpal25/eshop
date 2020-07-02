import createProductStore from './productStore';

export default function createStore({ logger }) {
  const Store = {};
  const context = { logger, Store };

  // Main Stores
  Store.Product = createProductStore(context);

  return Store;
}
