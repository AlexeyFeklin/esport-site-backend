import mongoose from 'mongoose';

const ClubSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: Number,
      required: true,
    },
    previewPhoto: String,
    text: {
      type: String,
      required: true,
    },
    usefulLinks: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Club', ClubSchema);
