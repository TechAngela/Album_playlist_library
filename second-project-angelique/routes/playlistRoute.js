import express from 'express';
import * as PlaylistController from '../controllers/playlistController.js';

const router = express.Router();
router.post('/create', PlaylistController.createPlaylist);
router.post('/addsong/:playlistId/songs/:songId', PlaylistController.addSongToPlaylist);
router.get('/read/:id', PlaylistController.getPlaylistContents);

export default router;