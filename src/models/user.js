import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String, Number } = Schema.Types;

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
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
