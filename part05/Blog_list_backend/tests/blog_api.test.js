const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index') // !!!

const api = supertest(app)

afterAll(async () => {
    await mongoose.connection.close()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('all notes have id and not _id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.id)
    expect(contents).toBeDefined()
})
  
test('a new blog can be added and deleted', async () => {
    const init = 2
    const testBlog = {
        title: 'DeleteMe',
        author: 'SpaceHobo3131',
        url: 'someurl',
        likes: '100500'
    }
  
    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(init + 1)
    
    const testId = response.body[2]
    console.log(testId.id)
    await api.delete(`/api/blogs/${testId.id}`)
})

test('a blog likes can be edited', async () => {
    const response = await api.get('/api/blogs')
    const testId2 = response.body[0]
    const newLikes = {
        likes: testId2.likes + 1,
    } 

    await api
        .put(`/api/blogs/${testId2.id}`)
        .send(newLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const updatedResponse = await api.get('/api/blogs')
    expect(newLikes.likes).toEqual(updatedResponse.body[0].likes)
})