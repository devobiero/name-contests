const { orderedFor } = require('../lib/util');

module.exports = mPool => ({
  getUsersByIds(userIds) {
    return mPool.collection('users')
      .find({ userId: { $in: userIds } })
      .toArray()
      .then(rows => orderedFor(rows, userIds, 'userId', true));
  }
});
