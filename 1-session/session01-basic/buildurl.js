const http = require("http")

const hostname = "jsonplaceholder.typicode.com"
const path='/todos/50'

const urlObject = {
    protocol: "https",
    hostname: hostname,
    pathname: path,
    port: 80
}

const urlString = http.format(urlObject)
console.log(urlObject)
