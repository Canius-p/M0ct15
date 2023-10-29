const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");
const express = require("express")
const app = express();
const cors = require("cors")
const port = 2000;
// Enable Cross-Origin Resource Sharing (CORS) for requests from http://localhost:5173
app.use(cors({
    origin : "http://localhost:5173",
}))

// Parse JSON and URL-encoded data from the request body
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Connect to the database
connectDatabase()

// GET API -> /
// Returns a JSON response with the message "I am alive"
app.get("/",(req,res)=>{
   res.json({
    message : "I am alive"
   })
})

// GET API => /blogs (All blogs)
// Fetches all blogs from the Blog model and returns them as a JSON response
// If there are no blogs, returns a 404 status code with a message "Empty blogs"
app.get("/blogs",async (req,res)=>{
   try {
    const blogs =  await Blog.find()
   if(blogs.length == 0){
    res.status(404).json({
        message : "Empty blogs"
    })
   }else{
       res.status(200).json({
           message : "Blogs fetched successfully",
           blogs : blogs
        })
    }
   } catch (error) {
console.log("something went wrong")
   }
})

// GET API -> /blogs/:id (single Blog)
// Fetches a single blog with the given id and returns it as a JSON response
// If no blog is found with the given id, returns a 404 status code with a message "No blog found"
app.get("/blogs/:id",async (req,res)=>{
  try {
    const id = req.params.id
    const blog = await Blog.findById(id)
     if(blog){
         res.status(200).json({
             message : "Blog fetched successfully",
             blog : blog
         })
     }else{
         res.status(404).json({
             message : "No blog found"
         })
     }
  } catch (error) {
    // alert("something went wrong")
    console.log("something went wrong")

  }
})

// CREATE BLOG API  
// Creates a new blog with the given title, subTitle, and description in the request body
// Returns a 201 status code with a message "Blog created succesfully"
app.post("/blogs", async(req,res)=>{
   const title = req.body.title;
   const subTitle = req.body.subTitle 
   const description = req.body.description
try {
    
   await Blog.create({
    title : title  ,
    subTitle : subTitle,
    description : description
})

res.status(201).json({
    message : "Blog created succesfully"
})
} catch (error) {
    console.log("something went wrong")  
}
})

// UPDATE BLOG API 
// Updates the blog with the given id with the new title, subTitle, and description in the request body
// Returns a 200 status code with a message "Blog updated succesfully"
app.patch("/blogs/:id",async (req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    
  try {
    await Blog.findByIdAndUpdate(id,{
        title : title,
        subTitle : subTitle,
        description : description
    })
    
    res.status(200).json({
        message : "Blog updated succesfully"
    })  
  } catch (error) {
    console.log("something went wrong")
  }
})

// DELETE API 
// Deletes the blog with the given id
// Returns a 200 status code with a message "Blog Deleted Successfully"
app.delete("/blogs/:id",async (req,res)=>{
    const id = req.params.id

    await Blog.findByIdAndDelete(id)

    res.status(200).json({
        message : "Blog Deleted Successfully"
    })
})

// Start the server on port 2000
app.listen(port,()=>{
    console.log(`app listening on port http://127.0.0.1:${port}`);
})