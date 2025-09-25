import mongoose from "mongoose";

const connect = async () => {
  try {
    const connectionURL = process.env.MONGO_URL;
    return mongoose.connect(connectionURL);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connect;
