import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const UpdateBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    const response = await axios.patch(
      "http://localhost:2000/blogs/" + id,
      blog
    );
    if (response.status == 201) {
      alert("Blog updated successfully");
    } else {
      alert("something went wrong");
    }
  };
  const fetchBlogs = async () => {
    const respose = await axios.get("http://localhost:2000/blogs/" + id);
    if (respose.status == 200) {
      setBlog(respose.data.blog);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update Blog
          </h2>
          <form onSubmit={updateBlog}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title{" "}
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  value={blog.title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Title"
                  required=""
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="subTitle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sub Title
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  value={blog.subTitle}
                  name="subTitle"
                  id="subTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" Type subTitle"
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  id="description"
                  value={blog.description}
                  name="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateBlog;
