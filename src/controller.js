const { bodyParser } = require("./lib/bodyParser");
const url = require("url");
const database = [];

//Get All Users
exports.getUsers = function (req, res) {
  let response = [
    {
      message: "Get all users",
    },
    database,
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

//Create Users
exports.createUsers = async function (req, res) {
  await bodyParser(req);

//Check that an user with this ID does not already exists
  if (database.length == 0) {
    database.push(req.body);
  } else {
    database.forEach((e) => {
      if (req.body.id != e.id) {
        database.push(req.body);
      } else {
        console.log("This ID already exists!");
      }
    });
  }

  let response = [
    {
      message: "User Created Successfull",
    },
    database,
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

//Update Users
exports.updateUsers = async function (req, res) {
  await bodyParser(req);
  const urlParser = url.parse(req.url, true);
  const userId = JSON.stringify(urlParser.query.id);

  database.forEach((e) => {
    if (userId === JSON.stringify(e.id)) {
      database[e.id - 1] = req.body;
    }
  });

  let response = [
    {
      message: "User Updated Successfully",
    },
    database,
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};
