const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()

const session = require("express-session")
app.use(session({
    resave : true,
    saveUninitialized:true,
    secret:"sbdckjshfiuwgdws863"
}))

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//serve static assests if in production
if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/bluid'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.use('/products',require("./routes/productRoutes").route)
app.use('/users',require("./routes/userRoutes").route)

const PORT = process.env.PORT || 3232;

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})