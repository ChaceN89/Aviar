import axios from 'axios'

const API_URL = '/api/posts/'

const posts = [
    {
        id: 123,
        user: "tester",
        creator: "betaCreator",
        statement: "Glorious Sunset",
        imageURL: 'https://www.artranked.com/images/4b/4b18840d83f9a59964defbf1a9abe764.jpeg'
    },
    {
        id: 124,
        user: "tester",
        creator: "alphaCreator",
        statement: "Glorious Colours",
        imageURL: 'https://cdn.shopify.com/s/files/1/0950/0728/products/glorious-colors-6-michaels-lyric_1024x1024.jpg?v=1575645351'
    },
    {
        id: 125,
        user: "tester",
        creator: "omegaCreator",
        statement: "Glorious Sky",
        imageURL: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/glorious-sky-lydia-falletti.jpg'
    }
];

// Get all posts
const getPosts = async token => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // const response = await axios.get(API_URL, config);
    localStorage.setItem('posts', posts);
    return posts;
    // return response.data;
}

const postService = {
    getPosts
}

export default postService