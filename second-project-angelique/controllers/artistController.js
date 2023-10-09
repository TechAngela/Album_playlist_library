import Artist from '../models/artistModel.js';

const createArtist = async (req, res) => {
     try {
       const { name, genre } = req.body;
       const existingArtist = await Artist.findOne({ name });
       
       if (existingArtist) {
         return res.status(400).json({ error: 'Artist with the same name already exists' });
       }
   
       const newArtist = await Artist.create({ name, genre });
       res.status(201).json(newArtist);
     } catch (error) {
       res.status(500).json({ error: 'Error creating the artist' });
     }
   };
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving artists' });
  }
};

const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the artist' });
  }
};
export {getArtistById, getAllArtists,createArtist}