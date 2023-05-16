import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.js'
import BlogForm from './BlogForm.js'

describe('<Blog />', () => {
    let container, mockHandler, blog

    beforeEach(() => {
        const username = 'testJest'
        blog = {
            title: 'Component testing is done with react-testing-library',
            id: '645cbc40c3d637f21a79049f',
            likes: 0,
            author: 'test',
            url: 'test.com',
            user: {
                username: 'kek',
                name: 'kak',
                id: '645cbc40c3d637f21a79049f'
            }
        }

        mockHandler = jest.fn()

        container = render(
            <Blog
                blog={blog}
                username={username}
                mock={mockHandler}
            />).container
    })

    test('renders content', async () => {
        const element = await screen.findByText('Component testing is done with react-testing-library')
        expect(element).toBeDefined()
        const element2 =  element.querySelector('.full_blog')
        expect(element2).toBeNull()
    })

    test('clicking the button show url and likes', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)

        const div = container.querySelector('.full_blog')
        screen.debug(div)
        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking the like button fires event twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show')

        await user.click(button)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('<BlogForm />', () => {

    test('form calls the event handler it received as props with the right details', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        render(
            <BlogForm
                createBlog={createBlog}
            />)

        const sendButton = screen.getByText('publish')

        const inputTitle = screen.getByPlaceholderText('write blog text here')
        await user.type(inputTitle, 'testing a title...')
        const inputAuthor = screen.getByPlaceholderText('write author here')
        await user.type(inputAuthor, 'testing an author...')
        const inputUrl = screen.getByPlaceholderText('write url here')
        await user.type(inputUrl, 'testing an url...')

        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testing a title...')
        expect(createBlog.mock.calls[0][0].author).toBe('testing an author...')
        expect(createBlog.mock.calls[0][0].url).toBe('testing an url...')
    })
})