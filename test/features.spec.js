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
        response.should.be.html;
        response.text.should.include("Please enter a subject for advice:");

        done();
      });
  });
})

describe('post to search', () => {
  it('can search by subject', done => {
    chai.request(server)
      .post("/search")
      .send({ subject: "life" })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;

        done();
      })
  })

  it('fails an invalid search term', done => {
    chai.request(server)
      .post("/search")
      .send({ subject: "asdf" })
      .end((err, response) => {
        response.should.have.status(200);
        response.text.should.include("No advice found for that subject, please try again!")

        done();
      })
  })
})

describe('get req to magic8ball', () => {
  it('can get a random 8ball response', done => {
    chai.request(server)
      .get("/magic8ball")
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        console.log("BODY: ", response.body);
        console.log("TEXT: ", response.text);
        done();
      })
  })
})
