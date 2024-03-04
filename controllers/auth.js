import bcrypt from "bcrypt";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import validator from "email-validator";

export const register= async (req,res) =>{
    try{ console.log(req.body);
        const {name, email, password} = req.body;

        // console.log(name, email, password);

        if(!name || !email || !password){
            return res.json({
                
                error: "Please enter All Fields",
            }) 
        }
        if (!validator.validate(email)) {
            return res.json({ error: 'A valid email is required' })
          }
          if (password && password?.length < 6) {
            return res.json({ error: "Password should be at least 6 characters" });
          }

        let user = await User.findOne({email});

        if(user){
            return res.json({
                error: "User already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await hashPassword(password);

        // console.log(hashedPassword);

        let newUser = await User.create({
            name, 
            email, 
            password: hashedPassword, 
        });
        console.log(newUser);
            newUser.password=undefined;
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newUser
        });
    }
    catch(err){
        return res.json({
             error:"something went wrong"
        });
    }

}
export const login= async (req,res) =>{
    try {
        const { email, password } = req.body;
        if( !email || !password){
          return res.json({
              
              error: "Please enter All Fields",
          }) 
      }
        //1 find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.json({ error: "No User Found!!! Please Register." });
        }
        // console.log(User);
        //2 compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
          return res.json({ error: "Wrong passsword" })
        }
        //3  create jwt tokens
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
         
        user.password = undefined;
    
        //4 send the response
        user.password = undefined;
        
        return res.json({
          token, user
        })
    
      } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong. Try again." });
      }
}

export const comparePassword = (password, hashed) => { return bcrypt.compare(password, hashed) }
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        })
      })
    })
  
  }