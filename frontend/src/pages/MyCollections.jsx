import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/spinner'
import {
  AccordionWithHeader,
  AccordionNode,
  AccordionHeader,
  AccordionPanel
} from 'react-accordion-with-header'
import Modal from 'react-modal'
import { FaPen } from 'react-icons/fa'
import { getCollections, reset } from '../features/collections/collectionSlice'

const BodyTpl = props => {
  // dispatch(getCollectionPosts(props.item)) // NEED TO GET POSTS HERE

  let posts
  // TEMPORARY
  switch (props.col) {
    case 0:
      posts = [
        { url: '/testimgs/1.jpg' },
        { url: '/testimgs/2.jpg' },
        { url: '/testimgs/3.jpg' }
      ]
      break
    case 1:
      posts = [{ url: '/testimgs/4.jpg' }, { url: '/testimgs/5.jpg' }]
      break
    case 2:
      posts = [
        { url: '/testimgs/6.jpg' },
        { url: '/testimgs/7.jpg' },
        { url: '/testimgs/8.jpg' },
        { url: '/testimgs/1.jpg' },
        { url: '/testimgs/3.jpg' }
      ]
      break
    default:
      posts = []
  }

  const imgList = posts.map(d => {
    return (
      <li key={d.url} className='galleryLi'>
        <img src={process.env.PUBLIC_URL + d.url} alt={d.url}></img>
      </li>
    )
  })

  return (
    <div>
      <ul className='galleryUl'>{imgList}</ul>
    </div>
  )
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
    transform: 'translate(-50%, -50%)'
  }
}

const galleryStyle = {}

function MyCollections () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { collections, isLoading, isError, message } = useSelector(
    state => state.collections
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getCollections())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  // setup modal
  const [{ modalIsOpen, selectedCol }, setModalState] = React.useState({
    modalIsOpen: false,
    selectedCol: null
  })

  function openModal (col) {
    setModalState({ modalIsOpen: true, selectedCol: col })
  }

  function closeModal () {
    setModalState({ modalIsOpen: false, selectedCol: null })
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
                    horizontalAlignment='centerSpaceAround'
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
                          id={i}
                        >
                          <div className='modal'>
                            <h2>Edit your collection</h2>
                            <button onClick={closeModal} className='close'>
                              X
                            </button>
                            <form>
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
                                />
                              </div>

                              <div className='form-group'>
                                <button type='submit' className='btn btn-block'>
                                  Rename
                                </button>
                              </div>
                            </form>
                            <hr style={{ marginBottom: '10px' }} />

                            <button
                              className='btn btn-block'
                              style={{ background: '#E23636', border: '0px' }}
                            >
                              Delete
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <div>{collection.collectionName}</div>
                    <div>Preview of art here</div>
                  </AccordionHeader>
                  <AccordionPanel>
                    <BodyTpl item={collection.PostList} col={i} />
                    {/* REMOVE col={i} AFTER GET POST IS IMPLEMENTED */}
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
