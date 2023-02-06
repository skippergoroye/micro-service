import mongoose from 'mongoose';
import { DB_URL } from '../config'


export const databaseConnection = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_URL)
        console.log("Database Connected Two")
    } catch (error) {
        console.log("Error ======")
        console.log(error)
        process.exit(1)
    }
}