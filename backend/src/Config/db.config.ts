//importing modules
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectionString = `mongodb+srv://beta_admin:beta_beta@betaproject.yy5ccsm.mongodb.net/`

const options: mongoose.ConnectOptions = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

//db connection
export const db = mongoose.connect(connectionString, options)
  .then(res => {
    if (res) {
      console.log(`Database connection succeffully to BetaDB`)
    }
  }).catch(err => {
    console.log(err)
  })