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
  const userExists = database.some((user) => user.id === req.body.id);

  if (!userExists) {
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

  } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ "message": "The user already exists"}));
      }
    
  };

//Update Users
exports.updateUsers = async function (req, res) {
  await bodyParser(req);
  const urlParser = url.parse(req.url, true);
  const userIdQuery = urlParser.query.id;

  //Check that an user with this ID does not already exists
  const userIndex = database.findIndex((user) => user.id == userIdQuery);
  console.log(userIndex)
    if (userIndex !== -1) {
      database[userIndex] = req.body;
      let response = [
        {
          message: "User Updated Successfully",
        },
        database,
      ];
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ "message": "This user does not exists in our Database"}));
    }

  
};

//Delete a single user
exports.deleteUser = function (req, res) {
  const urlParser = url.parse(req.url, true);
  const userIdQuery = urlParser.query.id;
  const userExists = database.some((user) => user.id == userIdQuery);

  if (userExists) {
    database.splice(urlParser.query.id - 1, 1);
    const response = [{ message: `User ${urlParser.query.id} deleted corretly` }, database];

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "This user does not exists!" }));
  }
};
