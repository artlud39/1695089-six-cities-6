import {Schema, Document, model} from 'mongoose';
import {User} from '../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  avatarPath: String,
  status: String,
}, {timestamps: true});


export const UserModel = model<UserDocument>('User', userSchema);
