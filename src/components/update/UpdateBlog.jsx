import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// toast step 1
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  body: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  author: Yup.string().required("Required"),
  
});

const UpdateBlog = () => {

    let {slug} = useParams();
    let [blog,setBlog] = useState(null)

    useEffect(()=> {
        axios
        .get("http://localhost:9000/blogs/"+slug)
        .then((resp) => {
          // runs if true
        //   console.log(resp.data)
        setBlog(resp.data);
        })
        .catch((err) => {
          // runs if false or error
          console.log(err)
        });
    },[])

  let redir = useNavigate();

    // toast step 3
    const notify = (text) => toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

return (
  <div className="flexCol mt-5 min-h-[70vh] ">
    <h1>Update Blog</h1>
     {
        blog && 
        <Formik
      initialValues={{
        title: blog.title,
        body: blog.body,
        author: blog.author,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        
        axios
        .patch("http://localhost:9000/blogs/"+slug,values)
        .then((resp) => {
          // runs if true
          notify('Blog Updated Successfully!!')
          setTimeout(() => {
            redir('/blog')
            
          }, 5000);
          
        })
        .catch((err) => {
          // runs if false or error
          notify(err.message)
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="flexCol p-5 rounded shadow-lg  ">
          {/* title */}
          <fieldset className="flexColStart gap-4">
            <label htmlFor="title">Title</label>
            <Field
              placeholder="Your title"
              className="inputStyle"
              id="title"
              name="title"
            />
          </fieldset>
          {errors.title && touched.title ? (
            <div className="text-left text-red-700 w-full text-[12px]">{errors.title}</div>
          ) : null}
          {/* author */}
          <fieldset className="flexColStart gap-4">
            <label htmlFor="author">Author</label>
            <Field
              placeholder="Your author"
              className="inputStyle"
              id="author"
              name="author"
            />
          </fieldset>
          {errors.author && touched.author ? (
            <div className="text-left text-red-700 w-full text-[12px]">{errors.author}</div>
          ) : null}
          {/* body */}
          <fieldset className="flexColStart gap-4">
            <label htmlFor="body">Body</label>
            <Field
              placeholder="Your body"
              className="inputStyle"
              id="body"
              name="body"
              as= "textarea"
            />
          </fieldset>
          {errors.body && touched.body ? <div className="text-left text-red-700 w-full text-[12px]">{errors.body}</div> : null}
          
          <button
            className="mt-5 border border-1 py-1 px-3 rounded hover:bg-green-500 hover:text-white "
            type="submit"
          >
            Update
          </button>
        </Form>
      )}
    </Formik>
     }
     {/* toast step 2 */}
     <ToastContainer />
  </div>
)};

export default UpdateBlog;