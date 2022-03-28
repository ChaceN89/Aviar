import React from 'react'

//### myCol
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
import { FaPen, FaPray } from 'react-icons/fa'
import {
  getCollections,
  addToCollection,
  removeFromCollection,
  createCollection,
  reset
} from '../features/collections/collectionSlice'
import { toast } from 'react-toastify'

//### website
// import ReactDOM from "react-dom";

// const App = () => {
//     return(<div>
//         Hello
//     </div>);
// };

// ReactDOM.render(<App />, document.querySelector("#root"));

function AddToCollection ({ postId, user, post }) {
  //this will be a determination of failure or success for getting users colelctionss

  //functionality to get collections
  const dispatch = useDispatch()

  const { collections, isLoading, isError, message } = useSelector(
    state => state.collections
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getCollections())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  const [formSelection, setFormSelection] = useState('')

  const [nameInput, setNameInput] = useState('')

  const onChange = e => {
    setFormSelection(e.target.value)
    checkIfPostExists()
  }

  const handleNameChange = e => {
    setNameInput(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    if (!nameInput) {
      toast.error('Please enter a collection name')
      return
    }

    const data = { id: postId, name: nameInput }

    dispatch(createCollection(data))

    toast.success(`${nameInput} collection created`)
    setNameInput('')
  }

  const handleAddToCollection = e => {
    e.preventDefault()

    let colId

    if (formSelection) {
      colId = formSelection
    } else {
      colId = collections[0]._id
    }

    const data = { pid: postId, cid: colId }

    dispatch(addToCollection(data))
    toast.success('Post added to collection')
  }

  const handleRemoveFromCollection = e => {
    e.preventDefault()

    let colId

    if (formSelection) {
      colId = formSelection
    } else {
      colId = collections[0]._id
    }

    const data = { pid: postId, cid: colId }

    dispatch(removeFromCollection(data))
    toast.success('Post removed from collection')
  }

  const checkIfPostExists = () => {
    let colId

    if (formSelection) {
      colId = formSelection
    } else {
      colId = collections[0]._id
    }

    const collection = collections.find(element => element._id === colId)
    for (const post of collection.PostList) {
      console.log(post._id)
      console.log('Current post' + postId)
      if (post._id === postId) {
        console.log(post)
        return (
          <>
            <div className='form-group'>
              <button
                className='btn btn-block'
                onClick={handleRemoveFromCollection}
                style={{ background: '#E23636', border: '0px' }}
              >
                Remove from collection
              </button>
            </div>
          </>
        )
      }
    }
    return (
      <>
        <div className='form-group'>
          <button className='btn btn-block' onClick={handleAddToCollection}>
            Add to collection
          </button>
        </div>
      </>
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div style={{ width: '50%', margin: '0 auto' }}>
        {collections[0] ? (
          <>
            <br></br>
            <h3>
              Add post to an existing collection or create a new collection:
            </h3>
            <br></br>

            <form>
              <div className='form-group'>
                <select
                  className='textGradient'
                  onChange={onChange}
                  style={{ backgroundColor: 'white', textAlign: 'center' }}
                  value={formSelection}
                >
                  {collections.map(i => (
                    <option value={i._id}>{i.collectionName}</option>
                  ))}
                </select>
              </div>
              {checkIfPostExists()}
            </form>
          </>
        ) : null}
        {!collections[0] ? <h3>Create a new collection: </h3> : null}
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              className='textGradient'
              type='text'
              id='colName'
              name='colName'
              value={nameInput}
              placeholder='New collection name'
              onChange={handleNameChange}
            />
          </div>
          <div className='form-group'>
            <button
              className='btn btn-block'
              type='submit'
              style={{ backgroundColor: '#2f9351', border: '0px' }}
            >
              Add to new collection
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddToCollection
