const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const DataLoader = require("dataloader");
const pgDB = require("../database/pgdb")(pgPool);

const app = require("express")();
const ncSchema = require("../schema");
const graphqlHTTP = require("express-graphql");

const { MongoClient } = require("mongodb");
const assert = require("assert");
const mgConfig = require("../config/mongo")[nodeEnv];

MongoClient.connect(mgConfig.url, (err, mPool) => {
    assert.equal(err, null);
    const mdb = require("../database/mdb")(mPool);
    app.use('/graphql', (req, res) => {
        const loaders = {
            usersByIds: new DataLoader(pgDB.getUsersByIds),
            usersByApiKeys: new DataLoader(pgDB.getUsersByApiKeys),
            namesForContestIds: new DataLoader(pgDB.getNamesForContestsIds),
            contestForUserIds: new DataLoader(pgDB.getContestsForUserIds),
            totalVotesByNamesIds: new DataLoader(pgDB.getTotalVotesByNamesIds),
            activitiesForUserIds: new DataLoader(pgDB.getActivitiesForUserIds),
            mdb: {
                usersByIds: new DataLoader(mdb.getUsersByIds)
            }
        };

        graphqlHTTP({
            schema: ncSchema,
            graphiql: true,
            context: { pgPool, mPool, loaders }
        })(req, res);

    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
});


