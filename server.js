const express = require('express')
const app = express()

const session = require("express-session")
app.use(session({
    resave : true,
    saveUninitialized:true,
    secret:"sbdckjshfiuwgdws863"
}))

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/client/public'))

app.use('/products',require("./routes/productRoutes").route)
app.use('/users',require("./routes/userRoutes").route)

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(3232,()=>{
    console.log("server started at http://localhost:3232")
})