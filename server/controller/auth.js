import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import User from '../model/User.js'
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/sendEmail.js';


export const register = async (req, res, next) => {
    const { firstName, lastName, regNo, email, password, confirmPassword } = req.body;

    try {
        const oldUser = await User.findOne({ regNo });
        if (oldUser) return res.status(400).json({ message: 'User already exists' });
        // compare passwords
        if (!password || !confirmPassword || !firstName || !lastName || !regNo || !email){
            return res.status(400).json({ message: 'Please fill the empty fields' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match! Try Again.' });
        }
        if (password.length < 6 && confirmPassword.length < 6) {
            return res.status(400).json({ message: 'Passwords less than 6 characters' });
        }

        const user = await User.create({ firstName, lastName, regNo, email, password })
        if (user){ 
            const msg = "You have been Registered successfully";
            sendToken(user, 201, res, msg);
        }
    } catch (error) {
        next(error);
    }
}

// export const signin = async (req, res) => {
//     const { password, regNo } = req.body;
//     console.log({password, regNo });

//     if (!regNo || !password) {
//         res.status(400).json({ success: false, error: 'Please provide an email and password' })
//     }

//     try {
//         const oldUser = await User.findOne({ regNo });
//         console.log({oldUser});
//         if (!oldUser) {
//             return res.status(404).json({ message: 'User does not exist' });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
//         console.log('password:', isPasswordCorrect)
//         if(!isPasswordCorrect) {
//             return res.status(400).json({ message: 'Invalid credentials.. Try again' });
//             console.log("incorrect password")
//         }
//         const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {  expiresIn: '1h' })
//         console.log('token:', token);
//         res.status(200).json({ result: oldUser, token });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong." })
//         console.log(error)
//     }
// }

export const login = async (req, res, next) => {
    const { regNo, password } = req.body;

    console.log('reg no:',regNo)
    if (!regNo || !password) {
        return next(new ErrorResponse('Please provide email and password', 400))
    }

    try {
        const user = await User.findOne({ regNo }).select("+password");
        console.log('user from login',user);

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        const isMatch = await user.matchPasswords(password);
        if (!isMatch){
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        if (isMatch && user) {
            const msg = "You have succcessfully signed up";
            sendToken(user, 200, res, msg);
        }
    } catch (error) {
        return next(new ErrorResponse('something went wrong', 500))
    }
}


export const forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email){
        return next(new ErrorResponse("Please provide your email address!", 400));
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Email could not be found", 404));
        }
        // Hashed token
        const resetToken = user.generatePasswordToken();
        console.log("resetToken user controller:", resetToken);
        await user.save();
        console.log('resetPasswordToken User controller:', user.resetPasswordToken);
        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go this link to reset youur password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password reset request",
                text: message
            });

            res.status(200).send({ success: true, message: "Email Sent, Please check your inbox"});
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("Email could not be sent", 500))
        }
    } catch (error) {
        next(error)
    }
};

export const resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })
        if(!user){
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }
        user.password = req.body.password;
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined

        await user.save();
        res.status(201).send({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        next(error);
    }
};

const sendToken = (user, statusCode, res, msg) => {
    const token = user.getSignedToken();
    res.status(statusCode).send({ success: true, message: msg, token, user })
    console.log("token generated:", token)
}

