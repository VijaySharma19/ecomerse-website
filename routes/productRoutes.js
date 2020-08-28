const route = require("express").Router();
const { addProduct,deleteProduct,findAllProducts } = require("../db/products")

route.get('/',async (req,res)=>{
    await findAllProducts().then(data=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(501).send(err)
    })
})


route.post("/",async(req,res)=>{
    const  title = req.body.title;
    const price = req.body.price;
    const description =req.body.description
    await addProduct(title,price,description).then((result)=>{
        res.status(201).send(result)
    }).catch((err)=>{
        res.status(405).send(err)
    })
})

route.delete('/:id',async (req,res)=>{
    await deleteProduct(req.params.id).then(data=>{
        res.status(303).redirect('/api/proucts')
    }).catch(err=>{
        res.status(405).send(err)
    });
})

exports=module.exports={
    route
}