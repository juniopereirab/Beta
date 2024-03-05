import express, { Application } from 'express'
import cors from 'cors'
import { db } from '../Config/db.config'
import { productRouter } from '../Routes/product.routes'
import { userRouter } from '../Routes/user.routes'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Routes
app.use(productRouter)
app.use(userRouter)

app.get('/', (req, res) => {
    return res.status(200).send({ message: 'Hello World!' })
})

export { db, app }