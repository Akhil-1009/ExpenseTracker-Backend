import { model, Schema, ObjectId } from "mongoose";

const transactionSchema = new Schema(
    {  
       userid:{
          type:String,
          required:true
       },
       amount:{
            type:Number,
            required:true
       },
       type:{
            type:String,
            required:true
       },
       category:{
            type:String,
            required:true
       },
       reference:{
            type:String,
            required:true
       },
       description:{
            type:String,
            required:true
       },
       date:{
            type: Date,
            required:true
       }
      
    },
    { timestamps: true }
  );
  
  export default model("Transaction", transactionSchema);