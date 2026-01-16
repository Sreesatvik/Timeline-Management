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
            res.status(201).json({ message: newUser });

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }
}
