import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://shiva_097:shiva_097@paailashop.d416j.mongodb.net/paailashop", {
            
            useNewUrlParser: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)

        process.exit(1)
    }
}

export default connectDB