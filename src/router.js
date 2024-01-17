const http = require("http");
const url = require("url");

module.exports = http.createServer((req, res) => {
  const urlParser = url.parse(req.url, true);
  const apiOptions = require("./controller");

  switch (req.method) {
    case "GET":
      if (urlParser.pathname === "/users") {
        apiOptions.getUsers(req, res);
      }
      break;
      case "POST":
        if (urlParser.pathname === "/users") {
          apiOptions.createUsers(req, res);
          
        }
        break;
      case "PUT":
        if (urlParser.pathname === "/users" && Object.hasOwn(urlParser.query, 'id')) {
          apiOptions.updateUsers(req, res);
        }
        break;
    default:
      return
  }
  /*
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({message: "Hello"}));*/
});
