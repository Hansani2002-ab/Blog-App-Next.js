'use client'; // ✅ This makes this a Client Component

import React, { useEffect, useState } from 'react';
import { blog_data } from '@/Assets/assets';

const BlogPage = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const blog = blog_data.find((item) => Number(item.id) === Number(id));
    if (blog) setData(blog);
  }, [id]);

  return (
    <div>
      <h1>Blog ID: {id}</h1>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
        </div>
      ) : (
        <p>Loading blog data...</p>
      )}
    </div>
  );
};

export default BlogPage;
