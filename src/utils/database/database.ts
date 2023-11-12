import mongoose from "mongoose";

const url =
  "mongodb+srv://root:qwer1234@3by3.em2dfcg.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      dbName: "three",
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
