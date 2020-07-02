import glob from "glob";
import fs from "fs";

// eslint-disable-next-line global-require, import/no-dynamic-require
const resolvers = glob
  .sync(`${__dirname}/**/resolver.js`)
  .map(file => require(file).default);
const definitions = glob
  .sync(`${__dirname}/**/*.graphql`)
  .map(file => fs.readFileSync(file, "utf-8"));

module.exports = {
  resolvers,
  definitions
};
