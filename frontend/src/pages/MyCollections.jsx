import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import {
  AccordionWithHeader,
  AccordionNode,
  AccordionHeader,
  AccordionPanel
} from 'react-accordion-with-header'
import Modal from 'react-modal'
import { FaPen } from 'react-icons/fa'
import {
  deleteCollection,
  getCollections,
  getPostsByCollection,
  reset,
  updateCollectionName
} from '../features/collections/collectionSlice'

const BodyTpl = props => {
  const posts = props.posts
  if (posts) {
    const imgList = posts.map(post => {
      return (
        <li key={post.imgPath} className='galleryLi'>
          <Link to={'/post/' + post._id}>
            <img
              src={process.env.PUBLIC_URL + '/' + post.imgPath}
              alt={post.imgPath}
            ></img>
          </Link>
        </li>
      )
    })
    return (
      <div>
        <ul className='galleryUl'>{imgList}</ul>
      </div>
    )
  } else {
    return (
      <div>
        <p style={{ minHeight: '1000px' } /*Fixes accordion bug*/}>
          Couldn't load posts
        </p>
      </div>
    )
  }

  return <div>testing</div>
}

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '15%'
  }
}

function MyCollections () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const {
    collections,
    // postsByCollection,
    isLoading,
    isError,
    message
  } = useSelector(state => state.collections)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getCollections())

    // const retrieveCollections = async () => {
    //   await dispatch(getCollections())
    // }
    // retrieveCollections()

    // retrieveCollections().then(() => {
    //   dispatch(getPostsByCollection())
    // })

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  // setup modal
  const [{ modalIsOpen, selectedCol }, setModalState] = useState({
    modalIsOpen: false,
    selectedCol: null
  })

  function openModal (col) {
    setModalState({ modalIsOpen: true, selectedCol: col })
  }

  function closeModal () {
    setModalState({ modalIsOpen: false, selectedCol: null })
  }

  const [confirmIsOpen, setConfirmState] = useState(false)

  function openConfirm (col) {
    setConfirmState(true)
  }

  function closeConfirm () {
    setConfirmState(false)
  }

  const [colName, setColName] = useState('')

  const handleRenameChange = e => {
    setColName(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleRenameSubmit = e => {
    e.preventDefault()

    dispatch(updateCollectionName(selectedCol._id, colName))

    closeModal()
  }

  const handleDelete = () => {
    dispatch(deleteCollection(selectedCol._id))

    closeConfirm()
    closeModal()
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>My Collections</h1>
        <p>Where your dreams come together.</p>
      </section>

      <section className='body'>
        {collections.length === 0 ? (
          <h3>You have no collections</h3>
        ) : (
          <AccordionWithHeader>
            {collections.map((collection, i) => {
              return (
                <AccordionNode key={i}>
                  <AccordionHeader
                    horizontalAlignment='centerSpaceBetween'
                    verticalAlignment='center'
                  >
                    <div onClick={e => e.stopPropagation()}>
                      <button
                        className='btn'
                        onClick={() => openModal(collection)}
                        style={{ padding: '5px 0px', paddingLeft: '8px' }}
                      >
                        <FaPen />
                      </button>
                      <div onClick={e => e.stopPropagation()}>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          ariaHideApp={false}
                          style={modalStyle}
                        >
                          <div className='modal'>
                            <h2>Edit your collection</h2>
                            <button onClick={closeModal} className='close'>
                              X
                            </button>
                            <form onSubmit={handleRenameSubmit}>
                              <p>Collection name</p>
                              <div className='form-group'>
                                <input
                                  type='collectionName'
                                  className='form-control'
                                  id='collectionName'
                                  name='collectionName'
                                  placeholder={
                                    selectedCol && selectedCol.collectionName
                                  }
                                  onChange={handleRenameChange}
                                />
                              </div>
                              <div className='form-group'>
                                <button
                                  onClick={handleRenameSubmit}
                                  className='btn btn-block'
                                >
                                  Rename
                                </button>
                              </div>
                            </form>
                            <hr style={{ marginBottom: '10px' }} />

                            <button
                              className='btn btn-block'
                              onClick={openConfirm}
                              style={{ background: '#E23636', border: '0px' }}
                            >
                              Delete
                            </button>
                            <Modal
                              isOpen={confirmIsOpen}
                              onRequestClose={closeConfirm}
                              ariaHideApp={false}
                              style={modalStyle}
                            >
                              <div
                                className='modal'
                                style={{ textAlign: 'center' }}
                              >
                                <h4>
                                  Are you sure you want to delete this
                                  collection?
                                </h4>

                                <button
                                  onClick={closeConfirm}
                                  className='close'
                                >
                                  X
                                </button>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'nowrap'
                                  }}
                                >
                                  <button
                                    className='btn btn-box'
                                    style={{
                                      margin: '10px',
                                      background: '#E6E6E6',
                                      color: '#000'
                                    }}
                                    onClick={handleDelete}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className='btn btn-box'
                                    style={{ margin: '10px' }}
                                    onClick={closeConfirm}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <div>{collection.collectionName}</div>
                    <div></div>
                  </AccordionHeader>
                  <AccordionPanel>
                    <BodyTpl posts={collection.PostList} />
                    {/* <BodyTpl /> */}
                  </AccordionPanel>
                </AccordionNode>
              )
            })}
          </AccordionWithHeader>
        )}
      </section>
    </>
  )
}

export default MyCollections
