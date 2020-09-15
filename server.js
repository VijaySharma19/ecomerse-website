const express = require('express')
const app = express()
const path = require('path')



const session = require("express-session")
app.use(session({
    resave : true,
    saveUninitialized:true,
    secret:"sbdckjshfiuwgdws863"
}))

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/products',require("./routes/productRoutes").route)
app.use('/users',require("./routes/userRoutes").route)

//server static assets if in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


const PORT = process.env.PORT || 3232;

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})