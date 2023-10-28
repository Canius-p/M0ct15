import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function SingleBlog() {
    const id = useParams
    console.log(id)
    const fetchSingleBlogs = async() =>{
    //sending data to api
    const response =  await axios.get("http://localhost:2000/blogs/" + id)    
       console.log(response)
}

useEffect (()=>{
    fetchSingleBlogs()
},[])
  return (
    <div>SingleBlog</div>
  )
}

export default SingleBlog