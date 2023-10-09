import express from "express";
import connectDB from './utils/database.js';
import userRoutes from "./routes/userRoute.js";
import songRoutes from "./routes/songRoute.js";
import artistRoutes from './routes/artistRoute.js';
import playlistRoutes from './routes/playlistRoute.js';
import albumRoute from "./routes/albumRoute.js"
const app = express();
app.use(express.json()); 
app.use('/api/users', userRoutes);
app.use('/api/song',songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/playlists', playlistRoutes);
app.use("/api/album",albumRoute)

const PORT = 3001;
connectDB().then(() => {
     app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
     });
 });



