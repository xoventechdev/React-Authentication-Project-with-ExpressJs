import UserModel from '../Model/UserModel.js';
import bcrypt from 'bcrypt';
import { response } from 'express';
import JWT from 'jsonwebtoken';

export const UserRegistration = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if( name == null || email == null || password == null){
            return res.status(400).json({status: 'warning', response: 'All fields are required'});
        }
        const existsUser = await UserModel.findOne({email: email});
        if(existsUser){
            return res.json({status: 'warning', response: `One user has already registered with this email address ${email}`});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userCreated = await UserModel.create({name: name, email: email, password: hashedPassword});
        if(!userCreated){
            return res.json({status: 'error', response: 'User creation failed'});
        }
        return res.json({status: 'success', response: 'User successfully registered'});
        
    } catch (error) {
        res.json({status: 'error', response:error.message});
    }
}


export const UserLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if( email == null || password == null){
            return res.json({status : 'warning', response: 'Please enter all fields'});
        }
        const existsUser = await UserModel.findOne({email: email});
        if(!existsUser){
            return res.json({status: 'warning', response: `No user has registered with this email address ${email}`});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existsUser.password);
        if(!isPasswordCorrect){
            return res.json({status: 'warning', response: `Incorrect password`});
        }
        const token = JWT.sign({
            exp: Math.floor( Date.now() / 1000 + (60 * 60 * 12)),
            email: email
        }, 'joyBangla');
        return res.json({status:'success', response: 'User successfully logged in', token: token, email: email});
        
    } catch (error) {
        res.json({status: 'error', response:error.message});
    }
}