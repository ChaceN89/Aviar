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
import { Link, useNavigate } from 'react-router-dom';
import { getAllPosts, reset } from '../features/dashboard/dashboardSlice'

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
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    state => state.posts
  );

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    }
    dispatch(getAllPosts());

    return () => {
      dispatch(reset())
    }
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  return (
    // <div>Home</div>
    <div className="App">
      <Zoom>
        {/*Using Zoom Effect*/}
      </Zoom>
      <Fade top>
        <h1 className='todayGallery'>Today's Gallery</h1>
      </Fade>
      {(isSuccess && posts.length > 0) ? (
        posts.map((post) => (
          <Fade bottom>
            <Post key={post._id} postId={post._id} user={post.user}
              caption={post.caption} medium={post.medium}
              theme={post.theme} imageURL={post.imgPath} comments={post.comments}
            />
          </Fade>
        ))) : (
        <>
          <h2 className='post__text'>Posts not found! Please try again...</h2>
        </>
      )}

    </div>
  )
}

export default Dashboard