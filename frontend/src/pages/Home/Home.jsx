import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import './Home.css'
import { Link } from "react-router-dom";
function Home() {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const respose = await axios.get("http://localhost:2000/blogs");
      setBlogs(respose.data.blogs);
    } catch (error) {
      alert("something went wrong");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
{blogs.map((blog) => (
  <div key={blog._id} className="card-body ml-30 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5  className="card-title mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {blog.title}</h5>
  <h3 className="card-subtitle mb-3 font-normal text-gray-700 dark:text-gray-400">
    {blog.subTitle}
  </h3>
  <p className="card-disc mb-3 font-normal text-gray-700 dark:text-gray-400">
    {blog.description}
  </p>
  <a
    href="#"
    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  > 
  <Link to={`/singleBlog/${blog._id}`}>Read more </Link>
    <svg
      className="w-3.5 h-3.5 ml-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  </a>
</div>
))}
    </div>
  );
}

export default Home;
