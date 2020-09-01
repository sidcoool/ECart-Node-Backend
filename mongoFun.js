const { MongoClient, ObjectID } = require('mongodb')
const uri = "mongodb+srv://{username}:{password}@cluster0.vzvup.mongodb.net/ecart?retryWrites=true&w=majority"
const Client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

exports.getAll = async function getAll() {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.find().toArray()
        return data 
    }
    catch (e) {
        // console.log("=================================")
        console.error(e)
    }
    // finally {
    //     await Client.close()
    // }
}


exports.insertProduct = async function insertProduct(product) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.insertOne(product)
        return data 
    }
    catch (e) {
        // console.log("=================================")
        console.error(e)
    }
}


exports.deleteProduct = async function deleteProduct(id,key) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.remove({_id : new ObjectID(id), secret_code:key})
        return data 
    }
    catch (e) {
        // console.log("=================================")
        console.error(e)
    }
}

exports.updateProduct = async function updateProduct(id, product) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        // console.log(product)
        let data = await col.updateOne({_id : new ObjectID(id), secret_code:product.secret_code},
        {$set: product})
        return data 
    }
    catch (e) {
        // console.log("=================================")
        console.error(e)
    }

}

