const request = require('supertest');
const chai = require('chai');
const app = require('./index');

const { expect } = chai;

describe('Name contests API', () => {
  it('Should return a user given an api key', (done) => {
    request(app).post('/graphql')
      .send({ query: '{ me(key: "4242") { id } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.me.id).to.be.equal('1');
        done();
      });
  });
});
