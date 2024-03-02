import express from 'express'
import cors from 'cors'
import { db } from '../Config/db.config'
import { productRouter } from '../Routes/product.routes'
import { userRouter } from '../Routes/user.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Routes
app.use(productRouter)
app.use(userRouter)

db.then(() => {
    app.listen(5050, () => console.log('Server is listening on port 5050'))
})