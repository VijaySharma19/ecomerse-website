const {MongoClient , ObjectID} = require("mongodb");
const { getProductById } = require('./products')



const MongoUrl=  "mongodb+srv://Vj:vj12345@cluster0.r3wgc.mongodb.net/ecomerseDb?retryWrites=true&w=majority";
const dbName = "ecomerseDb";


async function createUser(username,emailId,contactNo,password,address,avatar){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');

    return await users.findOne({"emailId": emailId }).then((res)=>{
        if(res==null){
            const user =  users.insertOne({
                username : username,
                emailId : emailId,
                contactNo : contactNo,
                password : password,
                products : [],
                address : address,
                avatar : avatar
            })
        
            return user;
        }
        else{
            throw new Error("User with this Email Id already exists. Please either Login Or try again using another Email Id")
        }
    }).catch(err=>{throw err})

    

}

async function getUserById (id){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');
    
    const user = users.findOne({"_id" : ObjectID(id)})
    return user;
}

async function authenticateUser(emailId,password){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
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
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');

    return await users.find({'_id': ObjectID(userId)}).toArray().then((data)=>{

        // check wheter the item already present or not in the cart
        let flag = false;
        const productsArray = data[0].products;
        productsArray.map((product)=>{
            if(product.id == productId){
                flag =true;
            }    
        })
        // if already exists then throw error
        if(flag){
            throw new Error("This product already exists in the cart")
        }
        
        //if not present then add the product to cart
        else{
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
        }
        
    }).catch(err=>{throw err})
}



async function deleteAllUsers(){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');
    await users.deleteMany()
    console.log("users deleted")
}

async function showCartItems(userId){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');

    const user = await users.findOne({'_id':ObjectID(userId)})
    const productList = getProductById(user.products) 
    return productList

}

async function removeItemsFromCart(userId,productId){
    const client = await MongoClient.connect(MongoUrl, { useNewUrlParser: true });
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');

    return await users.findOne({"_id":ObjectID(userId)}).then(user=>{
        let updatedProducts =user.products;
        updatedProducts = updatedProducts.filter(product => product.id != productId);

        const query = {'_id':ObjectID(userId)};
        const newValues={ $set : { products : updatedProducts } };
        users.updateOne(query,newValues,(err,res)=>{
            if(err)
            throw err;
        })
    }).catch(err=>{throw err}) 

}




exports= module.exports={
    authenticateUser,
    createUser,
    updatedCartItems,
    showCartItems,
    getUserById,
    removeItemsFromCart
}
