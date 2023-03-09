import { db } from '../interceptors/firebase';
import React,{useState,useEffect} from 'react';

import { collection, addDoc, getDocs } from "firebase/firestore";

function FirebaseFetch() {
  const [blogs,setBlogs]=useState([])
  const fetchBlogs=async()=>{
    const response=await getDocs(db,localStorage.getItem("gameId"));
    const data=await response.get();
    data.docs.forEach(item=>{
     setBlogs([...blogs,item.data([])])
    })
  }
  useEffect(() => {
    fetchBlogs();
  }, [])
  return (
    <div className="App">
      {
        blogs && blogs.map(blog=>{
          return(
            <div className="blog-container">
              <h4>{blog.title}</h4>
              <p>{blog.body}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default FirebaseFetch;
