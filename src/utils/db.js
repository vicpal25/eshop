import mongoose from "mongoose";
import logger from "utils/logger";
import definitions from "utils/error/definitions";
import { productSchema } from "utils/schema";

const mongooseDelete = require("mongoose-delete");

const {
  PRODUCT_DB,
  PRODUCT_COLLECTION,
  MONGO_URI,
  MONGO_AUTHSOURCE
} = process.env;

const dbConnectionParms = {
  useNewUrlParser: true,
  reconnectTries: 4,
  reconnectInterval: 2500,
  useFindAndModify: false
};

const handleMongoConnect = (error, database) => {
  if (error) {
    logger.fatal(error);
    const MongoError = Object.assign({}, definitions["ECOMM-004"]);
    delete MongoError.external;
    logger.fatal(MongoError);
    setTimeout(() => {
      process.exit(1);
    }, 2000);handleMongoConnect
  } else {
    logger.info(`Connected to ${database}`);
  }
};

const handleReconnnected = () => {
  const MongoReconnect = Object.assign({}, definitions["ECOMM-006"]);
  delete MongoReconnect.external;
  logger.warn(MongoReconnect);
};

const handleReconnectFailed = () => {
  const MongoReconnectFail = Object.assign({}, definitions["ECOMM-007"]);
  delete MongoReconnectFail.external;
  logger.fatal(MongoReconnectFail);
  throw new Error("Product Mongreconnect failed!");
};

const productsMongo = mongoose.createConnection(
  `${MONGO_URI}`,
  dbConnectionParms,
  error => handleMongoConnect(error, "Product Articles Database")
);

productsMongo.on("reconnected", handleReconnnected);
productsMongo.on("reconnectFailed", handleReconnectFailed);

export const productCollection = productsMongo.model(
  "products",
  productSchema,
  PRODUCT_COLLECTION
);
