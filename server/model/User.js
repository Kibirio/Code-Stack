import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'Please enter first name'] 
    },
    lastName: { 
        type: String, 
        required: [true, 'Please enter your last name']
    },
    email: { 
        type: String, 
        required: [true, 'Please enter your email'],
        unique: [true, 'Email should unique'],
        match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Please enter a valid email'
    ]
    },
    regNo: { 
        type: String, 
        required: [true, 'Please add a registration number'], 
        unique: [true, 'Registration number should be unique']
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password'],
        minlegth: [6, 'Password less than six characters'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Hashing the password
userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Generate the JWT tokens
userSchema.methods.getSignedToken = function() {
    return jwt.sign(
        { id: this._id, fn: this.firstName, ln: this.lastName, email:this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
        );
};

// Generate resetpassword token
userSchema.methods.generatePasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256") 
        .update(resetToken)
        .digest("hex");

        this.resetPasswordExpire = Date.now() + 60 * (60 * 1000)
        return resetToken;
}

export default mongoose.model('User', userSchema);