const express = require('express')

const app = express()

// middleware

// root
app.use((req, res, next) => {
    console.log("Middleware call at: " + Date.now())
    next();
})

// about
app.get('/about', (req, res, next) => {
    console.log("Middleware call at: " + Date.now())
    next(); 
})

// home
app.get('/', (req, res) => {
    res.send("Welcome home using GET method")

    console.log("Welcome home using GET method")
})



// server

let server = app.listen(3000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`Server running at port: ${port} and host: ${host}`)
})

console.log("Done")