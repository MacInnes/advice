const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = process.env.NODE_ENV || 'development';

chai.use(chaiHttp);

describe('root route', () => {
  it('can get root', done => {
    chai.request(server)
      .get("/")
      .end((err, response) => {

        response.should.have.status(200);
        done();
      });
  });
})
