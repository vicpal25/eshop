export default {
  Query: {
    async products(_, args, context, info) {
      const { id } = args;
      const { Store, errors } = context;
      let products;

      products = await Store.Product.findById(id);

      if (!products) {
        return [];
      }

      return products;
    }
  }
};
