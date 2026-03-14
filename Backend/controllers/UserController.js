import User from '../models/user.js';
import Users from '../models/user.js';
import bcrypt from 'bcryptjs';
export class UserController {

    async register(req, res) {
        try {
            console.log(req.body);
            const { username, email, password } = req.body;

            const EmailExists = await Users.findOne({ email: email });
            if (EmailExists) {
                return res.status(400).json({ message: "Email already exists" });
            }
            const newUser = await Users.create({ 
                username,
                email,
                password 
            });
            res.status(201).json({
                 message: "User registered successfully",
                 token: await newUser.generateToken()
            });

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user  = await Users.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            } 
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid email or password" });
            }   
            res.status(200).json({
                message: "Login successful",
                token: await user.generateToken()
            });
        }   catch (error) { 
            res.status(500).json({ message: "Server Error" });
        }
    }
}
