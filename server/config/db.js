import  mongoose from 'mongoose';
mongoose.set('strictQuery', true);


const connectDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1/form', {
            useNewUrlParser: true,
            UseUnifiedTopology: true
        })
       
    } catch (error) {
        console.log('not connected to database',error)
        process.exit(1)
    }


}

export default connectDB;

