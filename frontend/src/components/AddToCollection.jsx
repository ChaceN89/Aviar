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
import { FaPen } from 'react-icons/fa'
import {
  deleteCollection,
  getCollections,
  reset,
  updateCollectionName
} from '../features/collections/collectionSlice'

//### website
// import ReactDOM from "react-dom";

// const App = () => {
//     return(<div>
//         Hello
//     </div>);
// };

// ReactDOM.render(<App />, document.querySelector("#root"));



function AddToCollection({ postId, user, post }) {
    const collections = true; // test for 
            //this will be a determination of failure or success for getting users colelctionss
  
        //functionality to get collections
    
    return (
    <>
    {collections ?(
        <>

        <br></br> 
        <b>Add post to an existing collection or create a new collection: </b><br></br>
        
        <select>
            {collections.map((i) =>
            <>
                <option value={i._id}>Hello</option>
            </>)}
        </select>
        
      

        <div>add to Collection 1</div>
        <div>add to Collection 2</div>

        </>


    ):(
        <>
        <div>create a collection</div>

        </>

    )}
    <br />
    <div>AddToCollection </div>
    <div>Post to add is: {postId}</div>
    <div>Post to add is: {post._id}</div>
    <div>Post img is: {post.imgPath}</div>
    <div>User is: {user.username}</div>
    </>
  )
}

export default AddToCollection
