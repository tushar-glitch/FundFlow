const express = require('express')
const app = express()
const cors = require('cors')
const auth_Model = require('./models/userModel')
const mongoose = require('mongoose')
const user_route = require('./routes/user_routes')
const startup_route = require('./routes/startuproutes')
const investor_route = require('./routes/investor_routes')

app.use(cors())
app.use(express.json())

const connection_url = 'mongodb://jumbo:tcxCKjlxOsj1vdNe@ac-vi9pq53-shard-00-00.ktnuczj.mongodb.net:27017,ac-vi9pq53-shard-00-01.ktnuczj.mongodb.net:27017,ac-vi9pq53-shard-00-02.ktnuczj.mongodb.net:27017/?ssl=true&replicaSet=atlas-8zajnt-shard-0&authSource=admin&retryWrites=true&w=majority'
// app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })

app.use('/user',user_route)
app.use('/startup',startup_route)
app.use('/investor',investor_route)

app.listen(3001)