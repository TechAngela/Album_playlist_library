import express from "express"
import {createSong , updateSong , deleteSong , getSongById,listSongs,searchSongsByName } from "../controllers/songController.js"
import bodyParser from "body-parser";
const router = express.Router();
router.post("/create",createSong);
router.put('/update/:id',updateSong)
router.delete('/:id',deleteSong);
router.get('/songs/:id',getSongById);
router.get("/list",listSongs);
router.get("/search/:query",searchSongsByName)


router.use(bodyParser.json())

export default router;