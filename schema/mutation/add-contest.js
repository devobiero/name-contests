const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const pgDB = require('../../database/pgdb');

const ContestType = require('../types/contest');

const ContestInput = new GraphQLInputObjectType({
  name: 'ContestInput',
  fields: {
    apiKey: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString }
  }
});

module.exports = {
  type: ContestType,
  args: {
    input: { type: new GraphQLNonNull(ContestInput) }
  },
  resolve(obj, { input }, { pgPool }) {
    return pgDB(pgPool).addNewContest(input);
  }
};
