const express = require("express")
const app = express()
const productRouter = require("./routes/products")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use("/product", productRouter)

app.listen((process.env.PORT || 3333), () => {
    console.log("Listening to port 3333")
})
