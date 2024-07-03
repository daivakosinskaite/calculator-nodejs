const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const queryObject = parsedUrl.query;

    if (pathname === '/') {
        // Serve the HTML form
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/calculate') {
        // Process the form submission
        const num1 = parseFloat(queryObject.num1);
        const num2 = parseFloat(queryObject.num2);
        const operation = queryObject.operation;

        let result;

        if (isNaN(num1) || isNaN(num2)) {
            result = "Please provide valid numbers.";
        } else {
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        result = "Division by zero is not allowed.";
                    } else {
                        result = num1 / num2;
                    }
                    break;
                default:
                    result = "Please provide a valid operation (add, subtract, multiply, divide).";
            }
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Result: ${result}`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
