import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  
  const [postLists, setPostLists ] = useState([])
  const postsCollectionRef = collection(db, "posts")

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    getPosts();
  })

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
  }

  return(
    <div className="flex flex-col justify-center content-center">
      { postLists.map((post) => {
        return (
          <div className="shadow-2xl text-left mx-10 md:mx-32 mt-8 md:mt-16 border-2 p-2 border-gray-300 rounded-lg">
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-bold w-full"> { post.title }</h1>
              </div>
              <div>
                {
                  isAuth && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }} className="text-3xl text-center"> &#128465; </button>
                }
              </div>
            </div>
            <div className="text-sm w-full"> { post.post } </div>
            <h1 className="text-2xl w-full"> @{ post.author.name } </h1>
          </div>
        )
      })}
    </div>
  );
}

export default Home;
