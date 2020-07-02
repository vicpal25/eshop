import { productCollection } from 'utils/db';
import got from "got";

async function findById(id) {
  // make brand and article id required
  if (Number.isNaN(id)) {
    return null;
  }

  const result = await productCollection
    .find()
    .lean()
    .exec();

  return result;
}

async function findByCategory(category) {
  return []
}

export default function productStore() {
  return {
    findById: id => findById(id),
    findByCategory: category => findByCategory(category)
  };
}
