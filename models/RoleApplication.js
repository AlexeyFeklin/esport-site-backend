import mongoose from 'mongoose';

const RoleApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    desiredRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    achievements: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('RoleApplication', RoleApplicationSchema);
