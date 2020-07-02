// import { productCollection } from 'utils/db';
import got from "got";

async function findById(id) {
  // make brand and article id required
  if (Number.isNaN(id)) {
    return null;
  }

  const result = [
    {
      id: 343,
      name: "A cool widget"
    },
    {
      id: 23423,
      name: "Cool Coffee cup"
    }
  ];

  return result;
}

async function findByCategory(category) {
  const modelRegex = new RegExp(`^${processDashes(vehicleModel)}$`, "i");
  const makeRegex = new RegExp(`^${processDashes(vehicleMake)}$`, "i");

  const query = {
    "vehicleTags.make": makeRegex,
    "vehicleTags.model": modelRegex,
    "vehicleTags.year": vehicleYear,
    type: "capsule"
  };

  const result = await lithiumArticleCollection
    .findOne(query, projection)
    .lean()
    .exec();

  if (!result) {
    return null;
  }

  return result;
}

export default function productStore() {
  return {
    findById: id => findById(id),
    findByCategory: category => findByCategory(category)
  };
}
