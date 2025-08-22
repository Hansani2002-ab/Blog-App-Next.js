"use client";
import { blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {

  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen pt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Explore Our Blogs</h2>

      <div className='flex justify-center gap-6 my-10'>
        <button
          onClick={() => setMenu('All')}
          className={`py-2 px-5 rounded-full transition-all duration-200 shadow-md 
          ${menu === "All" ? "bg-indigo-700 text-white" : "bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-100"}`}>
          All
        </button>

        <button
          onClick={() => setMenu('Technology')}
          className={`py-2 px-5 rounded-full transition-all duration-200 shadow-md 
          ${menu === "Technology" ? "bg-indigo-700 text-white" : "bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-100"}`}>
          Technology
        </button>

        <button
          onClick={() => setMenu('Startup')}
          className={`py-2 px-5 rounded-full transition-all duration-200 shadow-md 
          ${menu === "Startup" ? "bg-indigo-700 text-white" : "bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-100"}`}>
          Startup
        </button>

        <button
          onClick={() => setMenu('Lifestyle')}
          className={`py-2 px-5 rounded-full transition-all duration-200 shadow-md 
          ${menu === "Lifestyle" ? "bg-indigo-700 text-white" : "bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-100"}`}>
          Lifestyle
        </button>
      </div>

      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {blogs
          .filter((item) => menu === "All" ? true : item.category === menu)
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
