export default {
  Query: {
    async products(_, args, context, info) {
      const { id } = args;
      const { Store, errors } = context;

      //Might be cached for future
      const products = id ? await Store.Product.findById(id) : await Store.Product.getAllProducts();

      if (!products) {
        return [];
      }

      return products;
    }
  }
};
