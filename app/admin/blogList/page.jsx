'use client';
import React, { useEffect, useState } from 'react';
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
  };

  const deleteBlogs = async (mongoId) => {
    const response = await axios.delete('/api/blog', {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-10 px-5 sm:px-12 lg:px-28">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">All Blogs</h1>

      <div className="relative h-[80vh] max-w-[1000px] overflow-x-auto border border-gray-300 rounded-md bg-white shadow-md">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-indigo-100 text-indigo-800">
            <tr>
              <th scope="col" className="hidden sm:table-cell px-6 py-4 font-semibold">
                Author
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Title
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Date
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                authorImg={item.authorImg}
                date={item.date}
                deleteBlog={deleteBlogs}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
