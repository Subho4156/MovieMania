import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default:""
    },
    searchHistory:{
        type: Array,
        default: [],
    },
    watchlist: [
        {
            contentId: String,
            contentType: String,
            title: String,
            poster_path: String,
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},{timestamps: true});

export const User = mongoose.model('User', userSchema);