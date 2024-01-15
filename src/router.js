const http = require('http');

const url = require("url");



module.exports = http.createServer((req, res) => {
  const urlParser = url.parse(req.url, true)

  console.log(`URL Hostname is: ${JSON.stringify(urlParser)}`)

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});