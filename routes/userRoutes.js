const route = require("express").Router()
const { createUser,authenticateUser } = require("../db/users")

route.post('/login',async (req,res)=>{
    await authenticateUser(req.body.emailId,req.body.password).then((data)=>{
        const result ={
            id: data._id,
            username: data.username,
            emailId : data.emailId,
            contactNo : data.contactNo
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
        res.status(201).redirect('/api/users/login')
    }).catch(err=>{
        res.status(406).send(err)
    })
})

exports= module.exports={
    route
}