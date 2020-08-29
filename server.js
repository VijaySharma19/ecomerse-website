const express = require('express')
const app = express()

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/products',require("./routes/productRoutes").route)
app.use('/users',require("./routes/userRoutes").route)

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(3232,()=>{
    console.log("server started at http://localhost:3232")
})