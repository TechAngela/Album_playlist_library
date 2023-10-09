import Song from "../models/songModel.js";
import Artist from '../models/artistModel.js';

const createSong = async (req, res) => {
  try {
    const { title, artist, duration , album} = req.body;

    const existingSong = await Song.findOne({ title });

    if (existingSong) {
      return res.status(400).json({ error: 'Song with this title already exists' });
    }

    const artists = await Artist.findOne({ _id: artist });

    if (!artists) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const newSong = await Song.create({
      title,
      artist: artist,
      album,
      duration,
    });

    res.status(201).json(newSong);
  } catch (error) {
    console.error('Error creating the song:', error);
    res.status(500).json({ error: 'Error creating the song' });
  }
};

const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, artist, album } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(id, { title, duration, artist, album }, { new: true });
    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the song' });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(deletedSong);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the song' });
  }
};

const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the song' });
  }
};

const listSongs = async (req, res) => {
  try {
    const songs = await Song.find({}, 'title artist');

    res.json(songs);
  } catch (error) {
    console.error('Error listing songs:', error);
    res.status(500).json({ error: 'Error listing songs' });
  }
};

const searchSongsByName = async (req, res) => {
  try {
    const { query } = req.params;
    const songs = await Song.find({ title: { $regex: new RegExp(query, 'i') } });

    res.json(songs);
  } catch (error) {
    console.error('Error searching for songs by name:', error);
    res.status(500).json({ error: 'Error searching for songs' });
  }
};
export { createSong, updateSong, deleteSong, getSongById, searchSongsByName, listSongs };