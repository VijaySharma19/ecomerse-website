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

async function getProductById (idArray){
    const client = await MongoClient.connect(MongoUrl);
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



exports= module.exports= {
    addProduct,
    findAllProducts,
    deleteProduct,
    getProductById
}
