const http = require('http');

http.createServer(function(req, res){
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end('Hello World!\n');
    const url = req.url;
    if(url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head><title>Home Page</title></head><body>')
        res.write('<h1>Hello World!</h1>')
        res.write('<p> This is demo page for nodejs </p>')
        res.write('</body>')
        res.write('<html>')
    }
    else if(url == '/about'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head><title>About Page</title></head><body>')
        res.write('<h1>About Page!</h1>')
        res.write('<p> This is demo page for nodejs </p>')
        res.write('</body>')
        res.write('<html>')
    }

    res.end();
}).listen(8080);

console.log('Server running at http://localhost:8080');