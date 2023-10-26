import { User } from "../models/users.js";
import bcrypt from "bcrypt";

export const getalluser = async (req,res,next) =>{
    try {
        const user = await User.find();
        if(!user) 
            return res.status(404).json({message: "No users found"});

        return res.status(200).json({user});
    } catch (error) {
        console.log(error)
    }
};

export const signUpUser = async (req, res, next) =>{
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user)
            return res.status(400).json({message: "User already exists!"});
        //is email is unique then signing up user into the DB
        const hashedPassword = await bcrypt.hash(password,10);
        user = await User.create({
            name,
            email,
            password:hashedPassword,
            blogs: [],
        });
        return res.status(201).json({message: "User Signed Up successfully!"});

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user)
            return res
                .status(404)
                .json({message: "Could'nt  find user by email!"});
        //is email is unique then signing up user into the DB
        const isMatched = bcrypt.compare(password, user.password);
        if(!isMatched)
            res.status(400).json({message : "Incorrect Password"})
        
        return res.status(200).json({message: "Login successfully!"});

    } catch (error) {
        console.log(error)
    }
}