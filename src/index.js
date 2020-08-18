const express=require('express')
require('./db/database')
const userRouter=require('./routers/userRouter')
const subRouter=require('./routers/subRouter')


const app = express()
const port = process.env.PORT || 3100;

app.use(express.json())
app.use(userRouter)
app.use(subRouter)

app.listen(port, ()=> {
    console.log("Server is up on "+port)
})