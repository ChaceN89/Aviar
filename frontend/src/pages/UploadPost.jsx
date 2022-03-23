import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
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

  const { imgPath, caption, theme,medium } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate,dispatch])

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    const postData = {
      imgPath,
      caption,
      theme,
      medium
      }

      dispatch(uploadPost(postData))
    
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
            <input
              type='imgPath'
              className='form-control'
              id='imgPath'
              name='imgPath'
              value={imgPath}
              placeholder='Enter your imgPath'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='caption'
              className='form-control'
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
              className='form-control'
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
              className='form-control'
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