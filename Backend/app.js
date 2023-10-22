const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");
const express = require("express")
const app = express();
const cors = require("cors")

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
})

// GET API -> /blogs/:id (single Blog)
// Fetches a single blog with the given id and returns it as a JSON response
// If no blog is found with the given id, returns a 404 status code with a message "No blog found"
app.get("/blogs/:id",async (req,res)=>{
   const id = req.params.id
   const blog = await Blog.findById(id)
    if(blog){
        res.status(200).json({
            message : "Blog fetched successfully",
            data : blog
        })
    }else{
        res.status(404).json({
            message : "No blog found"
        })
    }
})

// CREATE BLOG API  
// Creates a new blog with the given title, subTitle, and description in the request body
// Returns a 201 status code with a message "Blog created succesfully"
app.post("/blogs", async(req,res)=>{
   const title = req.body.title;
   const subTitle = req.body.subTitle 
   const description = req.body.description

   await Blog.create({
        title : title  ,
        subTitle : subTitle,
        description : description
    })
    
    res.status(201).json({
        message : "Blog created succesfully"
    })
})

// UPDATE BLOG API 
// Updates the blog with the given id with the new title, subTitle, and description in the request body
// Returns a 200 status code with a message "Blog updated succesfully"
app.patch("/blogs/:id",async (req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    
    await Blog.findByIdAndUpdate(id,{
        title : title,
        subTitle : subTitle,
        description : description
    })

    res.status(200).json({
        message : "Blog updated succesfully"
    })
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
app.listen(2000,()=>{
    console.log("Nodejs has started at port 2000")
})