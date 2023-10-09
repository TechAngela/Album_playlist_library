import mongoose, {Schema} from "mongoose";

const artistSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
        },
       genre: String
})
const Arstist = mongoose.model("Artist", artistSchema)
export default Arstist;