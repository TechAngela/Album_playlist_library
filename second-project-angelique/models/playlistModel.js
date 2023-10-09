import mongoose from "mongoose";
const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
})
const album = mongoose.model("album",albumSchema)
export default album