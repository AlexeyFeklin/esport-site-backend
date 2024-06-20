import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    previewPhoto: String, // Ссылка на изображение
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: { type: String }, // Место проведения
    format: {
      type: Number,
      required: true,
    },
    teamLimit: {
      type: Number,
      required: true,
    }, // Количество команд (ограничение)
    entryFee: {
      type: Number,
      required: true,
    },
    prizePool: {
      type: Number,
      required: true,
    }, // Призовой фонд
    status: {
      type: Number,
      required: true,
    }, // Статус турнира
    city: Number, // Регион турнира
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Tournament', TournamentSchema);
