const route = require("express").Router();
const { addProduct,deleteProduct,findAllProducts } = require("../db/products")

route.get('/',async (req,res)=>{
    await findAllProducts().then(data=>{
        res.status(200).send(data)
    }).catch((err)=>{
        err.name=''
        res.status(501).send(err.toString())
    })
})


route.post("/",async(req,res)=>{
    const  title = req.body.title;
    const price = req.body.price;
    const description =req.body.description
    const avatar = req.body.avatar;
    const category = req.body.category
    await addProduct(title,price,description,avatar,category).then((result)=>{
        res.status(201).send(result)
    }).catch((err)=>{
        err.name=''
        res.status(405).send(err.toString())
    })
})

route.delete('/:id',async (req,res)=>{
    await deleteProduct(req.params.id).then(data=>{
        res.status(303).redirect('/api/proucts')
    }).catch(err=>{
        err.name='' 
        res.status(405).send(err.toString())
    });
}) 

exports=module.exports={
    route
}