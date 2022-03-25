import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { uploadPost, reset } from '../features/uploadPosts/uploadPostsSlice'
import Spinner from '../components/Spinner'
import { GrAdd } from 'react-icons/gr' // icons

function UploadPost() {
  const [formData, setFormData] = useState({
    imgPath: '',
    caption: '',
    theme: '',
    medium: ''
  })

  const {imgPath,  caption, theme, medium } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(
    state => state.auth
  )
  const { post, isLoading, isError, isSuccess, message } = useSelector(
    state => state.uploadPosts
  )

  useEffect(() => {
    if (isError) {   // error in handling things if not all fields are filled
      toast.error(message)
    }

    if (!user) {   // shouldn';t need this part
      navigate('/login')
    }

    if (isSuccess ) {  // everything worked
      toast('Post Uploaded')
      navigate('/') // go to dashboard
    }

    return () => {
      dispatch(reset()) // reset the variables
    }
  }, [user, post, isLoading, isError, isSuccess, message, dispatch, navigate])


  const onChange = (e) => {  // for changing the form data as you type 
    setFormData({
      ...formData,[e.target.name]: e.target.value
    })
  }

  const handlePhoto = (e) =>{ // for handling the change in file
    setFormData({
      ...formData, imgPath: e.target.files[0] // sets photo to fornt data
    })
 
  }

  const onSubmit = e => {
    e.preventDefault()

    const postData = {
      imgPath,
      caption,
      theme,
      medium
      }

      dispatch(uploadPost(postData)) // send data to upload post
  }


  if (isLoading) { // for loading
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <GrAdd /> Add Post
        </h1>
        <p>Please add necessary fields </p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input className='search search_symbol'
              type="file" 
              accept=".png, .jpeg, .jpg"
              id='imgPath'
              name='imgPath'
              onChange={handlePhoto}
            />
          </div>

          <div className='form-group'>
            <input
              type='caption'
              className='form-control search'
              id='caption'
              name='caption'
              value={caption}
              placeholder='Enter caption'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='theme'
              className='form-control search'
              id='theme'
              name='theme'
              value={theme}
              placeholder='Confirm theme'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='medium'
              className='form-control search'
              id='medium'
              name='medium'
              value={medium}
              placeholder='Enter your medium'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      </section>
    </>
  )
}

export default UploadPost