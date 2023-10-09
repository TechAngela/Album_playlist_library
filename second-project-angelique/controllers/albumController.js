import Album from '../models/albumModel.js';


export const createAlbum = async (req, res) => {
     try {
          const { title, artist, releaseDate, genre, description, recordLabel, totalDuration } = req.body;

          const newAlbum = await Album.create({
               title,
               artist,
               releaseDate,
               genre,
               description,
               recordLabel,
               totalDuration,
          });

          res.status(201).json(newAlbum);
     } catch (error) {
          console.error("error creating the album:", error)
          res.status(500).json({ error: 'Error creating the album' });
     }
};


export const updateAlbum = async (req, res) => {
     try {
          const { id } = req.params;
          const { title, artist, releaseDate, genre, description, recordLabel, totalDuration } = req.body;

          const updatedAlbum = await Album.findByIdAndUpdate(
               id,
               {
                    title,
                    artist,
                    releaseDate,
                    genre,
                    description,
                    recordLabel,
                    totalDuration,
               },
               { new: true }
          );

          if (!updatedAlbum) {
               return res.status(404).json({ error: 'Album not found' });
          }

          res.json(updatedAlbum);
     } catch (error) {

          res.status(500).json({ error: 'Error updating the album' });
     }
};


export const deleteAlbum = async (req, res) => {
     try {
          const { id } = req.params;

          const deletedAlbum = await Album.findByIdAndDelete(id);

          if (!deletedAlbum) {
               return res.status(404).json({ error: 'Album not found' });
          }

          res.json(deletedAlbum);
     } catch (error) {
          res.status(500).json({ error: 'Error deleting the album' });
     }
};


export const getAlbumById = async (req, res) => {
     try {
          const { id } = req.params;

          const album = await Album.findById(id);

          if (!album) {
               return res.status(404).json({ error: 'Album not found' });
          }

          res.json(album);
     } catch (error) {
          res.status(500).json({ error: 'Error retrieving the album' });
     }
};