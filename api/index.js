const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const stripeRoute = require('./routes/stripe')

const dotenv = require('dotenv')
dotenv.config();

// const mongoose = require('mongoose')
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGODB_URL)
// 	.then(() => {
// 		console.log('DB connection successfull!')
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	})

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/checkout', stripeRoute)

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`))