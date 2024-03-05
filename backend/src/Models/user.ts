import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

export const UserSchemaValidate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    profile_pic: Joi.string(),
})

export interface IUser {
    name: string;
    email: string;
    password: string;
    profile_pic?: string;
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema <IUserDoc> ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profile_pic: {
        type: String,
        required: false
    }
});

userSchema.pre<IUserDoc>('save', async function pre(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
});

userSchema.set('timestamps', true);

export const User = model<IUserDoc>("User", userSchema);