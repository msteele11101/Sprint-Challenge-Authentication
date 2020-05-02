const Users = require('./users-model.js');
const db = require('../database/dbConfig');

describe('users model', function() {


    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('add()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds new user to the database', async function() {
            await Users.add({ username: 'gigi', password: "gigi123"});
            await Users.add({ username: 'canelo', password: 'canelo123'});

            const users = await db('users');

            expect(users).toHaveLength(2)
        })
    })
})