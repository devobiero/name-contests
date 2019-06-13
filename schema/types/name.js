/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Name',
  fields: () => {
    // used to break cyclic dependency
    const UserType = require('./user');
    const TotalVotes = require('./total-votes');

    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdBy: {
        type: new GraphQLNonNull(UserType),
        resolve(obj, args, { loaders }) {
          return loaders.usersByIds.load(obj.createdBy);
        }
      },
      totalVotes: {
        type: TotalVotes,
        resolve(obj, args, { loaders }) {
          return loaders.totalVotesByNamesIds.load(obj.id);
        }
      }
    };
  }
});
