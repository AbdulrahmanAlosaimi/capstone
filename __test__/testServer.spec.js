import 'regenerator-runtime/runtime'

const app = require('../src/server/server.js');
const supertest = require('supertest');

const dotenv = require('dotenv')
dotenv.config()

const geoNamesUsernameObject = {
    username: process.env.geoNamesAPI_USERNAME
}

describe('Fetching Geonames API name', () => {
    it('Should receive the username', async() => {
        await supertest(app).get('/geoNamesUsername')
            .expect(geoNamesUsernameObject)
    });
});