import express from 'express'
import cors from 'cors'
import { db } from '../Config/db.config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

db.then(() => {
    app.listen(5050, () => console.log('Server is listening on port 5050'))
})