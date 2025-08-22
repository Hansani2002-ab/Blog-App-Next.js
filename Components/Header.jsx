"use client";
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {

  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  }

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-white py-10 px-5 md:px-12 lg:px-28">
      
      {/* Top Bar with Logo and Button */}
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
        
        <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-[-6px_6px_0px_#000] bg-white hover:bg-indigo-50 transition-all duration-200">
          Get Started 
          <Image src={assets.arrow} alt="Arrow" />
        </button>
      </div>

      {/* Main Header Text Section */}
      <div className="text-center my-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 leading-tight">Latest Blogs</h1>
        <p className="mt-6 max-w-[740px] m-auto text-sm sm:text-base text-gray-700">
          This is the best place to find insightful blogs on technology, startups, lifestyle and more.
        </p>

        {/* Email Subscription Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between items-center max-w-[500px] mx-auto mt-10 border border-black shadow-[-6px_6px_0px_#000] bg-white rounded overflow-hidden"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 py-3 text-sm w-full outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-3 px-6 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
