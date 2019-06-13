const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const ContestType = require('./contest');
const ActivityType = require('./activity');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { loaders }) {
        return loaders.contestForUserIds.load(obj.id);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIds
          .load(obj.id)
          .then(res => res[fieldName]);
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIds
          .load(obj.id)
          .then(res => res[fieldName]);
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIds
          .load(obj.id)
          .then(res => res[fieldName]);
      }
    },
    activities: {
      type: new GraphQLList(ActivityType),
      resolve(obj, args, { loaders }) {
        return loaders.activitiesForUserIds.load(obj.id);
      }
    }
  }
});
