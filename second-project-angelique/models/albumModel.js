import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  recordLabel: {
    type: String,
  },
  totalDuration: {
    type: Number, 
  },
});

const Album = mongoose.model('Album', albumSchema);

export default Album;