import  mongoose from 'mongoose'
import * as dotenv from 'dotenv' 
dotenv.config()
mongoose.set('strictQuery', true);
const URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://tamjid:OT9p0ox95yjwLjaQ@cluster0.errziq4.mongodb.net/form?retryWrites=true&w=majority'  , {
            useNewUrlParser: true,
            UseUnifiedTopology: true
        })
       
    } catch (error) {
        console.log('not connected to database',error)
        process.exit(1)
    }


}

export default connectDB;

