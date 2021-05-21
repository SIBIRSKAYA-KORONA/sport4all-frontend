let http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
    console.log(req.url);
    let path, type;
    switch (req.url) {
    case '/bundle.js':
        path = 'dist/bundle.js';
        type = 'application/javascript';
        break;
    case '/bundle.js.map':
        path = 'dist/bundle.js.map';
        type = 'application/javascript';
        break;
    case '/style.css':
        path = 'dist/style.css';
        type = 'text/css';
        break;
    case '/style.css.map':
        path = 'dist/style.css.map';
        type = 'text/css';
        break;
    default:
        if (req.url.includes('.png')) {
            path = `dist${req.url}`;
            type = 'image/png';
        } else if (req.url.includes('.svg')) {
            path = `dist${req.url}`;
            type = 'image/svg+xml';
        } else if (req.url.includes('.jpg') || req.url.includes('jpeg')) {
            path = `dist${req.url}`;
            type = 'image/jpeg';
        } else {
            path = 'dist/index.html';
            type = 'text/html';
        }
        break;
    }
    fs.readFile(path, function (err, file) {
        if (err) {
            throw err;
        }
        res.writeHead(200, {'Content-Type': type});
        res.write(file);
        res.end();
    });
}).listen(8001);
