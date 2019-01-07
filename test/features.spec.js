const sw = require('selenium-webdriver');

const driver = new sw.Builder()
    .forBrowser('safari')
    .build();

const chai = require('chai');
const chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));

const should = chai.should();

const server = require('../app.js');

const environment = process.env.NODE_ENV || 'development';

describe('root route', () => {
  it('can get root', done => {
    driver.get('http://localhost:3000');
    chai.expect('body').dom.to.contain.text("Welcome to Express");
    done();
  });
})
