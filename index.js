const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const routePath = path.join(__dirname, "public", req.url === '/' ? "home.html" : `${req.url}.html`)

    fs.readFile(routePath, (err, content) => {
        if(err) {
            if(err.code === "ENOENT") {
                fs.readFile(path.join(
                    __dirname, "public", "error.html"
                ), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content)
                })
            }
        }else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(content)
        }
    })
})


const PORT = process.env.PORT || 4040
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})