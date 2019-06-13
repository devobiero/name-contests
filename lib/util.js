const humps = require('humps');
const _ = require('lodash');

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor: (rows, collection, field, singleObject) => {
    const data = humps.camelizeKeys(rows);
    const inGroupsOffField = _.groupBy(data, field);
    return collection.map((element) => {
      const elementArray = inGroupsOffField[element];
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray;
      }
      return singleObject ? {} : [];
    });
  },
  slug: str => str.toLowerCase().replace(/[\s\W-]+/, '-')
};
