import mongoose from 'mongoose';
import { createSong, updateSong, deleteSong, getSongById, searchSongsByName, listSongs } from '../songController.js';
import Song from '../models/songModel.js'; 
import Artist from '../models/artistModel.js'; 

describe('Song Controller', () => {
  beforeAll(async () => {
    
    await mongoose.connect('mongodb://localhost/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Song.deleteMany({});
    await Artist.deleteMany({});
  });

  it('should create a new song', async () => {
    const req = {
      body: {
        title: 'Test Song',
        artist: 'Artist ID',
        duration: 240,
        album: 'Album ID',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    Song.findOne = jest.fn().mockResolvedValue(null);
    Artist.findOne = jest.fn().mockResolvedValue({ _id: 'Artist ID' });

    await createSong(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Song' }));
  });

  it('should handle creating a song with a duplicate title', async () => {
    const req = {
      body: {
        title: 'Duplicate Song',
        artist: 'Artist ID',
        duration: 180,
        album: 'Album ID',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    Song.findOne = jest.fn().mockResolvedValue({ title: 'Duplicate Song' });
    Artist.findOne = jest.fn().mockResolvedValue({ _id: 'Artist ID' });

    await createSong(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Song with this title already exists' });
  });

});