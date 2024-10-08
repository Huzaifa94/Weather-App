import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../../model/user.js";

const JWT_SECRET = 'your_jwt_secret_key';

export class Users {
  async registerUser({ username, email, password }) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
      return { message: "User registered successfully" };
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async loginUser({ email, password }) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }
  
    
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1s' });
  
     
      return { 
       
        user: {
          email: user.email,
          username: user.username,
          token
        }
      };
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }
  
  }
  
  export const userService = new Users();

