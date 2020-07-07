import { productCollection, categoryCollection } from 'utils/db';
import got from 'got';

async function findById(id) {
  // make brand and article id required
  const result = await productCollection
    .find()
    .lean()
    .exec();

  if (!result) {
    return [];
  }

  return result;
}

async function getAllProducts() {
  const result = await productCollection
    .find()
    .lean()
    .exec();

  if (!result) {
    return [];
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
    categoryId,
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
    getAllProducts:() => getAllProducts(),
    getCategoryWithProducts: categoryId => getCategoryWithProducts(categoryId),
  };
}
