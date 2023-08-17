// loads  .env file contents into proccess

require('dotenv').config()

// import express and cors
const express = require('express')
const cors = require('cors')
// import connection js 
require('./db/connection')
// import router
const router = require('./routes/router')
// const router = require('./routes/router')

// create server app using express

const server = express()
// 
server.use(cors())
server.use(express.json())
//use router
server.use(router)
// server.use(router)
// 
const PORT = process.env.PORT || 3000
//
server.get('/',(req,res)=>{
    res.status(200).json('E cart server started')
})

server.listen(PORT,()=>{
    console.log(`E cart server starts with at port :${PORT}`);
})


// 



