import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const SingleBlog = () => {
    const {id} = useParams()
    const [blog,setBlog] = useState([])
    console.log(id)
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
<>
<h1>{blog.title}</h1>
<h1>{blog.subTitle}</h1>
<h1>{blog.description}</h1>
</>  )
}

export default SingleBlog