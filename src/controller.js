const { bodyParser } = require("./lib/bodyParser");

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
  database.push(req.body);

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
