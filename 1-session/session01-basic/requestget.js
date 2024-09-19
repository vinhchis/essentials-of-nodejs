const http = require("http")

const hostname = "jsonplaceholder.typicode.com"
const path='/todos/50'

const options = {
    hostname: hostname,
    path: path,
    method: "GET"
}


// create http server request
const req = http.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data += chunk
    })

    res.on('end', () => {
        console.log(data)
    })

})

req.on("error", (error) => {
    console.error(error)
})

// Send the GET request
req.end();