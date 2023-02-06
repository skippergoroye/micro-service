import express from 'express';
import cors from 'cors';
import proxy from "express-http-proxy"


const app = express();

app.use(cors())
app.use(express.json())

app.use('/customer', proxy('http://localhost:8001'))
app.use('/product', proxy('http://localhost:8002'))


const PORT = 8000

app.listen(PORT, () => {
    console.log(`GateWay is running at port ${PORT}`)
})