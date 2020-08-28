const {MongoClient , ObjectID} = require("mongodb");
const MongoUrl= "mongodb://localhost:27017";
const dbName = "ecomerseDb";

async function createUser(username,emailId,contactNo,password){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');

    const user = await users.insertOne({
        username : username,
        emailId : emailId,
        contactNo : contactNo,
        password : password,
        products : [

        ]
    })

    return user;

}

async function authenticateUser(emailId,password){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');


    return await users.find({emailId : emailId}).toArray().then((user)=>{
        if(user==0){
            console.log("rejected with no user")
            throw new Error("No such user Exist")
        }
        else{
            if(user[0].password===password){
                return user[0];
            }
            else{
                console.log("rejected with Incorrect password")
                throw new Error ('Incorrect password');
            }
        }
    }).catch((err)=>{
        throw err
    })
   
}

async function updatedCartItems(userId,productId){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');

    const user= users.find({'_id': ObjectID(userId)}).toArray()
    user.then((data)=>{
        const query = {'_id':ObjectID(userId)};
        const newProduct = {
            id : ObjectID(productId)
        }
        const productList = [...data[0].products,newProduct];
        const newValues={ $set : { products : productList } };
        users.updateOne(query,newValues,(err,res)=>{
            if(err)
            throw err;
        })
    })
    user.catch(err=>{throw err})
}



async function deleteAllUsers(){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');
    await users.deleteMany()
    console.log("users deleted")
}




exports= module.exports={
    authenticateUser,
    createUser,
    updatedCartItems,
}
