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
        password : password
    })

    return user;

}

async function authenticateUser(emailId,password){
    const client = await MongoClient.connect(MongoUrl);
    const ecomerseDb = await client.db(dbName);
    const users = await ecomerseDb.collection('users');

    // return await users.find({emailId : emailId}).toArray().then(async (user)=>{

    //     return await new Promise((resolve,reject)=>{
    //         if(user==0){
    //             console.log("rejected with no user")
    //             reject(new Error("No such User Exist"))
    //         }
    //         else{
    //             if(user[0].password===password){
    //                 resolve(user[0]);
    //             }
    //             else{
    //                 console.log("rejected with Incorrect password")
    //                 reject(new Error ('Incorrect password'));
    //             }
    //         }
    //     })
    // }).catch(err=>  err)

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

// authenticateUser('vj@gmail.com','itsm').then(data=>{
//     console.log(data)
// }).catch((err)=>{
//     console.log(err,"outside")
// })


exports= module.exports={
    authenticateUser,
    createUser
}
