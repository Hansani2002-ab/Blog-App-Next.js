'use client';
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);

        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennett",
          authorImg: "/author_img.png"
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error: " + (error?.response?.data?.error || error.message));
    }
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-10 px-5 sm:px-12 lg:px-28">
      <h2 className="text-3xl font-bold text-indigo-800 mb-10">Add New Blog</h2>

      <form onSubmit={onSubmitHandler} className="bg-white max-w-2xl p-6 rounded-lg shadow-lg border border-gray-200 space-y-6">

        {/* Upload Image */}
        <div>
          <p className="text-lg font-semibold text-gray-700">Upload Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer inline-block mt-3">
            <Image
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              width={140}
              height={70}
              alt="Upload Area"
              className="rounded-md border border-gray-300 hover:opacity-90 transition"
            />
          </label>
          <input
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Title */}
        <div>
          <p className="text-lg font-semibold text-gray-700">Blog Title</p>
          <input
            name="title"
            onChange={onChangeHandler}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-200"
            type="text"
            placeholder="Type here"
            required
            value={data.title}
          />
        </div>

        {/* Description */}
        <div>
          <p className="text-lg font-semibold text-gray-700">Blog Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Write content here"
            rows={6}
            required
            value={data.description}
          />
        </div>

        {/* Category */}
        <div>
          <p className="text-lg font-semibold text-gray-700">Blog Category</p>
          <select
            name="category"
            onChange={onChangeHandler}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md text-gray-600 outline-none focus:ring-2 focus:ring-indigo-200"
            value={data.category}
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full sm:w-40 h-12 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-800 transition-all"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
