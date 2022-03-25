import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { uploadPost, reset } from '../features/uploadPosts/uploadPostsSlice'
import Spinner from '../components/Spinner'
import { GrAdd } from 'react-icons/gr' // icons
import axios from 'axios';

function UploadPost() {
  //using hooks
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose a File'); // saves file name in onChangePhoto but not used currently
  const [preview, setPreview] = useState()

  const [formData, setFormData] = useState({
    caption: '',
    theme: '',
    medium: ''
  })
  const { caption, theme, medium } = formData

  const { user } = useSelector( // get user information
    state => state.auth
  )
  const { post, isLoading, isError, isSuccess, message } = useSelector(
    state => state.uploadPosts
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!file) {
      setPreview(undefined)
      setFilename('Choose a File') // set the current file name back if not file
    }else{
      setPreview(URL.createObjectURL(file)) // for setting a preview of the photo
    }

    if (isError) {   // error in handling things if not all fields are filled
      toast.error(message)
    }

    if (!user) {   // shouldn't need this part but good to have
      navigate('/login')
    }

    if (isSuccess ) {  // everything worked
      toast('Post Uploaded')
      navigate('/') // go to dashboard
    }

    return () => {
      dispatch(reset()) // reset the variables
    }
  }, [file, user, post, isLoading, isError, isSuccess, message, dispatch, navigate])

  //change text data
  const onChange = e => {
    setFormData({
      ...formData,[e.target.name]: e.target.value
    })
  };

  //change photo 
  const onChangePhoto = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name); // setting the name  not the file   
  };

  //SUBMITTION OF files
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();  // set form data
    formData.append('file', file);
    formData.append('caption', caption);
    formData.append('theme', theme);
    formData.append('medium', medium);

    dispatch(uploadPost(formData)) // send data to upload post
    
  };

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
              id='customFile'
              name='customFile'
              onChange={onChangePhoto}
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

        {/* disaply preview of upload */}
          <label className='custom-file-label' htmlFor='customFile'>
            <h2>{filename}</h2>
          </label>    
          <img style={{ width: '100%' }} src = {preview} alt='' />

        </form>
      </section>
    </>
  )
}

export default UploadPost