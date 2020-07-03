/* eslint-disable indent */
export default {
  Query: {
    async availableProducts(_, args, context, info) {
      const { categoryId } = args;
      const { Store, errors } = context;

      if (!categoryId) {
        return [];
      }

      const products = await Store.Product.getCategoryWithProducts(categoryId);

      if (!products) {
        return [];
      }

      return products;
    }
  }
};
