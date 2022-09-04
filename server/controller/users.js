import brcypt from "bcryptjs"
import jwt from "jsonwebtoken";
import User from "../models/users.js"

export const signIn = async(req, res) => {
    const { email, password } = req.body;

    try {

        const existingUser = await User.findOne({email});
        
        if(!existingUser) res.status(404).json('User Not Found');

        const isPasswordCorrect = await brcypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) res.status(404).json('Wrong Password');

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'SECRET_KEY', {expiresIn: '1h'})
        
        res.status(200).json({result: existingUser, token})

    } catch (error) {
        res.status(500).json(error);
    }
}

export const signUp = async(req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    try {

        // console.log(req.body);
        
        const existingUser = await User.findOne({email});

        if(existingUser) res.status(400).json('User Already Registered');

        if(password !== confirmPassword) res.status(400).json('Password Do Not Match');

        const name = `${firstName} ${lastName}`;

        const hashedPassword = await brcypt.hash(password, 12);

        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        }
        
        const result = await User.create(newUser);

        const token = jwt.sign({email: result.email, id: result._id}, 'SECRET_KEY', {expiresIn: '1h'});

        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json(error);
    }
}

