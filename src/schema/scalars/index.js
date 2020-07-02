import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

export default {
  definitions: ['scalar DateTime', 'scalar JSON', 'scalar JSONObject'],
  resolvers: [
    {
      DateTime: GraphQLDateTime,
      JSON: GraphQLJSON,
      JSONObject: GraphQLJSONObject,
    },
  ],
};
