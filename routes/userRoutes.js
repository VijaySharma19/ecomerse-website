const route = require("express").Router()
const { createUser,authenticateUser,updatedCartItems } = require("../db/users")

route.post('/login',async (req,res)=>{
    await authenticateUser(req.body.emailId,req.body.password).then((data)=>{
        const result ={
            id: data._id,
            username: data.username,
            emailId : data.emailId,
            contactNo : data.contactNo,
            products : data.products
        }
        res.status(202).send(result)
    }).catch((err)=>{
        err.name=''
        res.status(403).send({Error:err.toString()})
    })
})

route.post('/signup',async(req,res)=>{
    const username= req.body.username;
    const emailId= req.body.emailId;
    const password= req.body.password;
    const contact= req.body.contact;
    await createUser(username,emailId,contact,password).then(result=>{
        res.status(201).send('Account created')
    }).catch(err=>{
        res.status(406).send(err)
    })
})
route.post('/addToCart',async(req,res)=>{
    await updatedCartItems(req.body.userId,req.body.productId).then(()=>{
        res.status(202).send("Added successfully to the cart")
    }).catch((err)=>{
        err.name=''
        res.status(409).send({Error : err.toString()})
    })
})

exports= module.exports={
    route
}