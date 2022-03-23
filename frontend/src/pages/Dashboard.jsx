import React from 'react';
import { useEffect, useState } from 'react';
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect
import Fade from 'react-reveal/Fade';
import Post from './Post';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({//Modal Styling
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Dashboard() {
  // postId, creator, user, statement, imageURL
  // const [posts, setPosts] = useState([]); //Short term memory in react AKA Hooks

  // Temporary mock data
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


  // useEffect(() => {
  //     //code here
  //     db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
  //         //code to fire off via listener
  //         setPosts(snapshot.docs.map(doc => ({
  //             id: doc.id,
  //             post: doc.data()
  //         })))
  //     })//snapShot is a powerful listener
  // }, []);

  return (
    // <div>Home</div>
    <div className="App">
      <Zoom>{/*Using Zoom Effect*/}
        {/* piece upload time */}
        {/* art upload time file picker*/}
        {/* statement upload time */}
        {/* button upload time */}
      </Zoom>
      <Fade right>
        <h1 className='todayGallery'>Today's Gallery</h1>
      </Fade>
      {/*post loop*/}
      {posts.map(post => (
        //key allows reredners of the only posts that are updated instead of all posts
        <Fade left>
          <Post key={post.id} postId={post.id} user={post.user} creator={post.creator} statement={post.statement} imageURL={post.imageURL} />
        </Fade>
      ))}

      {/* Posts HARDCODED*/}

    </div>
  )
}

export default Dashboard