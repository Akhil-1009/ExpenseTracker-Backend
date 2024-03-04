import { model, Schema, ObjectId } from "mongoose";

const schema = new Schema(
    {
      name: {
        type: String,
        trim: true,
        default: "",
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        maxlength: 256,
      }, 
      photo: {},
      
    },
    { timestamps: true }
  );
  
  export default model("User", schema);