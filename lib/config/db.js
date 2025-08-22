import mongoose from "mongoose"

export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://blogapp:lRmVDf0mpXONgpSn@cluster0.mav4nkq.mongodb.net/nextBlog')
  console.log("DB Connected");
}