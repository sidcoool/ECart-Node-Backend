const express = require("express")
const router = express.Router()
const mongoFun = require("../mongoFun")
const fs = require('fs').promises;

// {
//     "product":"camera",
//     "price":"10000",
//     "email":"sid@gmail.com",
//     "secret_code":"griffindor",
//     "description":"Nikon 1 year old DSLR camera in good condition"
// }


router.get("/", async (req, res) => {
    let data = await mongoFun.getAll()
    //console.log(data)
    res.json(data)
})


router.post("/", async (req, res) => {

    //console.log(req.body)
    let data = await mongoFun.insertProduct(req.body)
    // console.log(data)
    if (data) {
        res.json({ "inserted": "true" })
    }
    else {
       res.json({ "inserted": "false" })
    }
})


router.delete("/", async (req, res) => {

    let data = await mongoFun.deleteProduct(req.query.id, req.query.key)
    // console.log(data)
    if (data.result.n) {
        res.json({ "deleted": "true" })
    }
    else {
        res.json({ "deleted": "false" })
    }
 
})

router.patch("/:id", async(req,res)=>{
    let data = await mongoFun.updateProduct(req.params.id, req.body)
    // console.log(data.result.n)
    if (data && data.result.n) {
        res.json({ "updated": "true" })
    }
    else {
        res.json({ "updated": "false" })
    }
})

module.exports = router


