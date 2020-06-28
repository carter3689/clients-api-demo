const request = require('supertest');
const app = require('../index');
const { intersect } = require('../knex-config');

describe('Create Client Not Auth', () => {
    it('Should NOT create a new client', async(done) => {
        const res = await request(app)
            .post('/all/clients/create')
            .send({
                id: 4,
                client_name: 'Double Edge Software',
            })
            expect(res.statusCode).toEqual(401)
            done()
    })
})

// describe('Get All Clients', () => {
//     it('Get All Clients', async(done) => {
//         const res  = await request(app)
//         .get('/all/clients')
//         expect(res.statusCode).toEqual(200)
//         done()
//     })
// });

