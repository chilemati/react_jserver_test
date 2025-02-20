import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  let [blog, setBlogs] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/blogs")
      .then((resp) => {
        // runs if true
        // console.log(resp.data)
        setBlogs(resp.data);
      })
      .catch((err) => {
        // runs if false or error
        console.log(err)
      });
  }, []);
  return (
    <div>
      <h2>Latest Blogs </h2>
      <div className="flex flex-col gap-4 items-center p-3 justify-center w-[70%] mx-auto my-7 shadow-lg ">
        {blog &&
          blog.map((each) => (
            <Link
              className="py-3 px-2 shadow-sm odd:bg-gray-200 rounded even:bg-transparent hover:bg-blue-800 hover:text-white text-[1rem]  "
              key={each.id}
              to={"/blog/" + each.id}
            >
              {" "}
              {each.title}{" "}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Blog;
