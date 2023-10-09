import mongoose from 'mongoose';

const playlistSongSchema = new mongoose.Schema({
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: true },
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  
});

const PlaylistSong = mongoose.model('PlaylistSong', playlistSongSchema);

export default PlaylistSong;