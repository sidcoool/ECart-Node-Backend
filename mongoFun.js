const { MongoClient, ObjectID } = require('mongodb')
const credentials = require('./credentials')
const uri = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.vzvup.mongodb.net/ecart?retryWrites=true&w=majority`
const Client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

exports.getAll = async function getAll() {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.find().toArray()
        return data 
    }
    catch (e) {
        console.error(e)
    }
    // finally {
    //     await Client.close()
    // }
}


exports.getUserItems = async function getUserItems(email) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.find({email: email}).toArray()
        return data 
    }
    catch (e) {
        console.error(e)
    }
}

exports.getWishlist = async function getWishlist(email) {
    try {
        const client = await Client.connect()

        const col = client.db("ecart").collection("products")

        let data = await col.find({wishlistUsers: email}).toArray()
        return data
    }
    catch (e) {
        console.error(e)
    }
}


exports.insertProduct = async function insertProduct(product) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.insertOne(product)
        return data 
    }
    catch (e) {
        console.error(e)
    }
}

exports.insertWishlist = async function insertWishlist(product) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.updateOne({_id : new ObjectID(product.id)},{$push: {wishlistUsers: product.email}})
        return data 
    }
    catch (e) {
        console.error(e)
    }
}



exports.deleteProduct = async function deleteProduct(id) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.remove({_id : new ObjectID(id)})
        return data
    }
    catch (e) {
        console.error(e)
    }
}

exports.deleteWishlist = async function deleteWishlist(id,email) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")
        let data = await col.updateOne({_id : new ObjectID(id)},{$pull: {wishlistUsers: email}})
        return data
    }
    catch (e) {
        console.error(e)
    }
}

exports.updateProduct = async function updateProduct(id, product) {
    try {
        const client = await Client.connect()
        const col = client.db("ecart").collection("products")

        let data = await col.updateOne({_id : new ObjectID(id)},{$set: product})
        return data
    }
    catch (e) {
        // console.log("=================================")
        console.error(e)
    }

}

