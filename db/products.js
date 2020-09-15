const {MongoClient , ObjectID} = require("mongodb");
require('dotenv').config()

const MongoUrl=  "mongodb+srv://Vj:vj12345@cluster0.r3wgc.mongodb.net/ecomerseDb?retryWrites=true&w=majority";
const dbName = "ecomerseDb";

async function addProduct(title,price,despcription,avatar,category){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');

    const product = await products.insertOne({
        title : title,
        price : price,
        despcription : despcription,
        avatar: avatar,
        category:category
    })
    return product;
}

async function findAllProducts(){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');

    const result = await products.find().toArray()
    return result;
}


async function deleteProduct(id){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');

    const result = await products.deleteOne({ "_id" : ObjectID(id) })
    return result;
}

async function getProductById (idArray){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');
    let outputArray = [];
    const arrayLength = idArray.length
    
    let result=idArray.map(element => {
        return products.find({ "_id" : ObjectID(element.id) }).toArray().then(res=>{
            outputArray=[...outputArray,res[0]]
            return outputArray;
        }).catch(err=>{throw err})
    });
    return result[arrayLength-1];
}

async function deleteAllProducts(){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');

    const result = await products.deleteMany({})
    return result;
}



exports= module.exports= {
    addProduct,
    findAllProducts,
    deleteProduct,
    getProductById
}
