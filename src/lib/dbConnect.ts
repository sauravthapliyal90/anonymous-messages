import mongoose from "mongoose";

type ConnectionObject= {
    isConnected?: number,
}

const connection: ConnectionObject = {}
//void mean i dont care which type of data is returning 
async function dbConnection(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return 
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '')
        console.log("db",db);
        
        connection.isConnected = db.connections[0].readyState
        console.log("db.connection",db.Connection);
        
        console.log("DB Connected Successfully")

    } catch (error) {

        console.log("Database connection failed", error);
        
        process.exit(1)
        
    }
}

export default dbConnection;