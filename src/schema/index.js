import { makeExecutableSchema } from 'graphql-tools';

import queries from "schema/queries";
// import mutations from 'schema/mutations';
import types from 'schema/types';
import scalars from 'schema/scalars';

export default makeExecutableSchema({
  typeDefs: [
    ...queries.definitions,
    // ...mutations.definitions,
    ...types.definitions,
    ...scalars.definitions
  ],

  resolvers: [
    ...queries.resolvers,
    // ...mutations.resolvers,
    ...types.resolvers,
    ...scalars.resolvers
  ]
});