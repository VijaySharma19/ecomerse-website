const {MongoClient , ObjectID} = require("mongodb");
const MongoUrl= "mongodb://localhost:27017";
const dbName = "ecomerseDb";

async function addProduct(title,price,despcription){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');

    const product = await products.insertOne({
        title : title,
        price : price,
        despcription : despcription
    })
    return product;
}

async function findAllProducts(){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');

    const result = await products.find().toArray()
    return result;
}


async function deleteProduct(id){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const products = await ecomerseDb.collection('products');

    const result = await products.deleteOne({ "_id" : ObjectID(id) })
    return result;
}


exports= module.exports= {
    addProduct,
    findAllProducts,
    deleteProduct
}
