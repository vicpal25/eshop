import { productCollection, categoryCollection } from "utils/db";
import got from "got";

async function findById(id) {
  // make brand and article id required
  if (Number.isNaN(id)) {
    return null;
  }

  return result;
}

async function getCategories() {
  const result = await categoryCollection
    .find()
    .lean()
    .exec();

  return result;
}

async function getCategoryWithProducts(categoryId) {

  const query = {
    cartegoryId: categoryId
  };

  const result = await productCollection
    .find(query)
    .lean()
    .exec();

  if (!result) {
    return [];
  }

  return result;
}

export default function productStore(id) {
  return {
    findById: id => findById(id),
    getCategories: id => getCategories(id),
    getCategoryWithProducts: categoryId => getCategoryWithProducts(categoryId)
  };
}
