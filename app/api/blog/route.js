// app/api/upload/route.js or route.ts (App Router)

import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import { title } from 'process';
import BlogModel from '@/lib/models/BlogModel';
import { log } from 'console';
const fs = require('fs');



//API endpoint to get all blogs
export async function GET(request) {

  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }else{
    const blogs = await BlogModel.find({});
     return NextResponse.json({blogs})
  }

  await ConnectDB(); // Safe place to call

  const blogs = await BlogModel.find({});

  return NextResponse.json({blogs});
}


//API endpoint for uploading blogs


export async function POST(req) {
  await ConnectDB();

  const formData = await req.formData();
  const image = formData.get('image');

  if (!image || typeof image === 'string') {
    return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const timestamp = Date.now();
  const filename = `${timestamp}_${image.name}`;
  const path = `./public/${filename}`;

  await writeFile(path, buffer);



  const imgUrl = `/${filename}`;

  const blogData = {
    title:`${formData.get('title')}`,
    description:`${formData.get('description')}`,
    category:`${formData.get('category')}`,
    author:`${formData.get('author')}`,
    image:`${imgUrl}`,
    authorImg:`${formData.get('authorImg')}`
  }

  await BlogModel.create(blogData);
console.log("Blog Saved");

  return NextResponse.json({ success:true,msg:"Blog Added" });
}

//creating API end point to dlete blog
export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"})
}
