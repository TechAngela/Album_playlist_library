import mongoose, { Schema } from "mongoose";
const songSchema = new mongoose.Schema({
     title: { type: String, required: true },
     duration: Number,
     artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
     album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
});
const Song = mongoose.model("Song", songSchema);
export default Song