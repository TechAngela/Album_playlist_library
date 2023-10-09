import express from 'express';
import * as ArtistController from '../controllers/artistController.js';

const router = express.Router();
router.post ("/add",ArtistController.createArtist)
router.get('/readall', ArtistController.getAllArtists);
router.get('/readone/:id', ArtistController.getArtistById);


export default router;