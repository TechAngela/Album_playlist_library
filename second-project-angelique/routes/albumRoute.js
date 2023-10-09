import express from 'express';
import * as AlbumController from '../controllers/albumController.js';

const router = express.Router();


router.post('/', AlbumController.createAlbum);
router.put('/:id', AlbumController.updateAlbum);
router.delete('/:id', AlbumController.deleteAlbum);
router.get('/:id', AlbumController.getAlbumById);

export default router;