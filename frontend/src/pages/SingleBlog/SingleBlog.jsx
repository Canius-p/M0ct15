import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"

const SingleBlog = () => {
  const navigate = useNavigate()
    const {id} = useParams()
    const [blog,setBlog] = useState([])

    //deleting blog
    const deleteBlog = async () =>{
      const response = await axios.delete("http://localhost:2000/blogs/" + id)
      if(response.status == 200){
        navigate("/")
  
      } else {
        alert("something went wrong")
    }
    }
    const fetchSingleBlogs = async() =>{
    //sending data to api
    const response =  await axios.get("http://localhost:2000/blogs/" + id)    
    if(response.status == 200){
      setBlog(response.data.blog)

    } else {
      alert("something went wrong")
  }

}

useEffect (()=>{
    fetchSingleBlogs()
},[])
  return (
<div>
<Navbar/>
<div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-indigo-600">{blog.title}</h1>
        <p className="text-sm text-gray-600">{blog.subTitle}</p>
        <div className="mt-4">
            <p className="text-lg text-gray-800">
            {blog.description}</p>
            <a
    href="#"
    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={deleteBlog}
  > 
  Del
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 ml-3 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

  </a> 
        </div>
 </div>
</div>
  )
}
export default SingleBlog

