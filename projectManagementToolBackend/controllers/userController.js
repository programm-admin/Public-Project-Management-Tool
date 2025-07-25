const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateUniqueId = require("generate-unique-id");

const generateAccountID = () => {
  const accountID = generateUniqueId({
    length: 60,
    includeSymbols: ["!", "_", "?"],
  });

  return accountID;
};

const loginUser = async (request, response) => {
  const { userName, password } = request.body;

  console.log("[POST] login user with name:", userName);
  // const userDBRequest = await User.find({
  //     userName: userName,
  // });
  // const foundUser = await userDBRequest;

  // if (!foundUser) {
  //     return response.status(401).json({ message: "User not found." });
  // }

  // TODO: search also for other things like password
  // TODO: hash password
  const foundUser = await User.findOne({
    userName,
  });

  if (!foundUser) {
    return response.status(400).json({ message: "User not found" });
  }

  //const isValidPassword = await bcrypt.compare(user.password, password);
  isValidPassword = false;

  // const arePasswordsMatch = await foundUser.matchPassword(password);

  // if (!arePasswordsMatch) {
  //     return res.status(401).json({ message: "invalid password" });
  // }

  // if (!isValidPassword) {
  //     return response
  //         .status(401)
  //         .json({ message: "Wrong Password or user not found." });
  // }

  // const token = jwt.sign(
  //     {
  //         id: foundUser.id,
  //         username: foundUser.username,
  //     },
  //     process.env.JWT_SECRET
  //     // { expiresIn: "1d" }
  // );
  const token = jwt.sign(
    {
      id: "fdfafdaggaf",
      username: "test",
    },
    process.env.JWT_SECRET
    // { expiresIn: "1d" }
  );

  response.status(200).json({
    authToken: token,
    message: "Login successfully",
    accountID: 1,
    userName: foundUser.userName,
  });
};

const registerUser = async (request, response) => {
  const { userName, password } = request.body;
  const newAccountID = generateAccountID(); // generating new account id
  const accountList = await User.find({});

  console.log("[PUT] register user with name:", userName);

  for (user in accountList) {
    if (user.accountID === newAccountID) {
      // generating new account id if already generated id is already in use
      newAccountID = generateAccountID();
    }
  }

  // insert new user into database
  const responseUser = new User({
    userName: userName,
    password: password,
    accountID: newAccountID,
  });

  await responseUser.save();
  console.log(
    `[REGISTER USER] new user in db: ${JSON.stringify(responseUser)}`
  );

  if (!responseUser) {
    return response.status(500).send("Error when inserting new user.");
  }

  const generatedAuthToken = jwt.sign(
    { userID: responseUser.accountID },
    "djfjad94fafdAiÜ))§jdfa"
  );

  response.status(200).json({
    authToken: generatedAuthToken,
    message: "New user inserted successfully.",
    accountID: responseUser.accountID,
  });
};

module.exports = { loginUser, registerUser };
