const route = require("express").Router()
const { createUser,authenticateUser,updatedCartItems,showCartItems,getUserById } = require("../db/users")

route.get("/",async(req,res)=>{
    if(req.session.userId){
        getUserById(req.session.userId).then(data=>{
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
            res.status(403).send(err.toString())
        })
    }
    else{
        res.send({error : "No user logged in"})
    }
})

route.get("/logout",async(req,res)=>{
    req.session.userId=null;
    res.send("Loged Out")
})

route.post('/login',async (req,res)=>{
    await authenticateUser(req.body.emailId,req.body.password).then((data)=>{
        const result ={
            id: data._id,
            username: data.username,
            emailId : data.emailId,
            contactNo : data.contactNo,
            products : data.products
        }
        req.session.userId = result.id;
        res.status(202).send(result)
    }).catch((err)=>{
        err.name=''
        res.status(403).send(err.toString())
    })
})

route.post('/signup',async(req,res)=>{
    const username= req.body.username;
    const emailId= req.body.emailId;
    const password= req.body.password;
    const contact= req.body.contact;
    const address = req.body.address
    const avatar = req.body.avatar
    await createUser(username,emailId,contact,password,address,avatar).then(data=>{
        const result ={
            id: data.ops[0]._id,
            username: data.ops[0].username,
            emailId : data.ops[0].emailId,
            contactNo : data.ops[0].contactNo,
            products : data.ops[0].products
        }
        req.session.userId = result.id;
        res.status(201).send(result)
    }).catch(err=>{
        err.name=''
        res.status(406).send(err.toString())
    })
})
route.post('/addToCart',async(req,res)=>{
    await updatedCartItems(req.body.userId,req.body.productId).then(()=>{
        res.status(202).send("Added successfully to the cart")
    }).catch((err)=>{
        err.name=''
        res.status(409).send(err.toString())
    })
})
route.post('/showCartItems',async (req,res)=>{
    await showCartItems(req.body.userId).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        err.name='';
        res.status(400).send(err.toString())
    })
}) 

exports= module.exports={
    route
}