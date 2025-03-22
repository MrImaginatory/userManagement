import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../model/user.model.js';

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ success:false,message: 'User already exists' });
  }
  if(password.length<8){
    res.status(400).json({success:false,message:"Weak Password!"})
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email });

    if(!email || !password){
        res.status(404).json({success:false,message:"Please enter Email and Password"});
    }
    if(!user.email){
        res.status(404).json({success:false,message:"User Not Found Please SignUp"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({success:false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET , { expiresIn: '1h' });
    res.cookie('jwtToken', token, { httpOnly: true }).status(200).json({ message: 'Login successful' });
  };

const logoutController = (req, res) => {
  res.clearCookie('jwtToken');
  res.status(200).json({ message: 'Logout successful' });
};

export { registerController, loginController, logoutController };