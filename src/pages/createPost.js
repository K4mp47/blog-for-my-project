import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("")
  
  const navigate = useNavigate();

  const postCollectionRef = collection(db, "posts")
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title, 
      post, 
      author: { 
        name: auth.currentUser.displayName, 
        id: auth.currentUser.uid 
      } 
    })
    navigate("/")
  }

  useEffect(() => {
    if(!isAuth) {
      navigate("/login")
    }
  }, [])

  return (
    <div>
      <div className="flex justify-center items-center flex-col m-8">
        <h1 className="text-2xl">Create a Post</h1>
        <div className="w-full flex justify-evenly text-center items-center my-8">
          <label>Title: </label>
          <input placeholder="Title..." className="w-6/12 h-12 border-2 border-gray-400 p-2 rounded-xl" onChange={(event) => { setTitle(event.target.value) }}/>
        </div>
        <div className="w-full flex justify-evenly text-center items-center my-8">
          <label>Post: </label>
          <textarea placeholder="Post..." className='w-6/12 h-32 border-2 border-gray-400 p-2 rounded-xl' onChange={(event) => { setPost(event.target.value) }}/>
        </div>
        <button className="bg-gray-900 rounded-xl p-2 text-white" onClick={createPost}>Submit</button>
      </div>
    </div>
  );
}

export default CreatePost;
