import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

let uuid = crypto.randomUUID();

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
});

const User = model("User", userSchema);

export default User;
