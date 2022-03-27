import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect
import Fade from 'react-reveal/Fade';
import Post from '../components/Post';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../components/Spinner';
import Modal from '@material-ui/core/Modal';
import { useNavigate } from 'react-router-dom';
import { getPosts, reset } from '../features/posts/postSlice'

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    state => state.posts
  );

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    }
    dispatch(getPosts());

    return () => {
      dispatch(reset())
    }
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  // Temporary mock data
  const posts2 = [
    {
      id: 123,
      user: "cahce",
      imgPath: '1648279225962green_beaach.jpg',
      caption: 'Glorious Beach',
      theme: 'Tropics',
      medium: 'Photo',
      comments:[
        "great photo",
        'I love that'  
      ],
    },
    {
      id: 1234,
      user: "chacen",
      imgPath: '1648274857555chgery_blosum_2.png',
      caption: 'Cherry Blossums',
      theme: 'Japan',
      medium: 'Art',
      comments:[
        "I travelled to Japan last summer"  
      ],

    },
    {
      id: 12345,
      user: "chacen",
      imgPath: '1648274176881dragon.png',
      caption: 'Dragon',
      theme: 'Japan',
      medium: 'Art',
      comments:[
         
      ],

    },
    
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
      {posts2 && posts2.map(post => (
        //key allows reredners of the only posts that are updated instead of all posts
        <Fade left>
          <Post key={post.id} postId={post.id} user={post.user} 
          caption={post.caption} medium={post.medium} 
          theme={post.theme} imageURL={post.imgPath} comments={post.comments} />
        </Fade>
      ))}

      {/* Posts HARDCODED*/}

    </div>
  )
}

export default Dashboard