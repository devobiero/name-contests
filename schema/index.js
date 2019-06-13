const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const UserType = require('./types/user');

// in a graph we need a starting point,
// we can use to start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    me: {
      type: UserType,
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      description: 'The current user identified by an api key',
      resolve: (obj, args, { loaders }) => loaders.usersByApiKeys.load(args.key)
    }
  }
});

const AddContestMutation = require('./mutation/add-contest');

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddContest: AddContestMutation
  })
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = ncSchema;
