import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URL, {
        
    }).then(con => {
        console.log(`MondoDB Database connected with HOST: ${con.connection.host}`);
    })
}

export default connectDatabase;