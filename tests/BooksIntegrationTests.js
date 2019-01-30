require('should');

const request = require('supertest');
const sequelize = require('sequelize');
process.env.NODE_ENV = 'Test';

const app = require('../app');
const { Book } = require('../dbconnection');

const agent = request.agent(app);

describe('Book CRUD Test:', () => {
    it('should allow a book to be posted and return read and _it', (done) => {
        const bookPost = {title: 'Book for Test', author: 'Test Author', genre: 'Test Genre'};

        agent.post('/api/books')
        .send(bookPost)
        .expect(201)
        .end((error, result) => {
            console.log(result);
            result.body.should.have.property('id');
            result.body.read.should.equal(false);
            done();
        })
    })

    afterEach((done) => {
      Book.destroy(({
        where: { title: 'Book for Test' }
      }));
      done();
    })
});

