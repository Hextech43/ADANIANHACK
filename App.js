require("./config/db")
const express = require("express")

const port = 1995

const app = express()
app.use(express.json())


app.use("/api", require("./Router"))
app.listen(port, ()=>{
    console.log(`server is ready at port ${port}`)
})

