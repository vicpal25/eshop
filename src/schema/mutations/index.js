import fs from 'fs';
import glob from 'glob';

// eslint-disable-next-line import/no-dynamic-require, global-require
const resolvers = glob.sync(`${__dirname}/resolvers/*.js`).map(file => require(file).default);
const mutations = fs.readFileSync(`${__dirname}/endpoints.graphql`, 'utf-8');

export default {
  resolvers,
  definitions: [mutations],
};
