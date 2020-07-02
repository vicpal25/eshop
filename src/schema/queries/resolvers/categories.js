export default {
  Query: {
    async categories(_, args, context, info) {
      const { id } = args;
      const { Store, errors } = context;
      let categories;
  
      categories = await Store.Product.getCategories();
  
      if (!categories) {
        return [];
      }
  
      return categories;
    }
  }
};
  