import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      default: '663c07259edd5258029e70d0',
    },
    firstName: String,
    nickname: String,
    lastName: String,
    city: String,
    kills: {
      type: Number,
      default: 0,
    },
    deaths: {
      type: Number,
      default: 0,
    },
    matches: {
      type: Number,
      default: 0,
    },
    avatarUrl: String,
    vkUrl: String,
    steamUrl: String,
    faceitUrl: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
