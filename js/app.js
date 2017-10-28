
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var mimeTypes = {
     "html": "text/html",
     "jpeg": "image/jpeg",
     "jpg": "image/jpeg",
     "png": "image/png",
     "js": "text/javascript",
     "css": "text/css"};

var http = require('http'),
    fs = require('fs');


fs.readFile('./dashboard.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer((request, response)=>{
        var pathname = url.parse(request.url).pathname;
        var filename : string;
        if(pathname === "/"){
            filename = "dashboard.html";
        }
        else
            filename = path.join(process.cwd(), pathname);

        try{
            fs.accessSync(filename, fs.F_OK);
            var fileStream = fs.createReadStream(filename);
            var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
            response.writeHead(200, {'Content-Type':mimeType});
            fileStream.pipe(response);
        }
        catch(e) {
                console.log('File not exists: ' + filename);
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write('404 Not Found\n');
                response.end();
                return;
        }
        return;
        }).listen(8000);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
