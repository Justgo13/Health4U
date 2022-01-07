const SellerUser = require("../models/seller-user");
const BuyerUser = require("../models/buyer-user");
const HttpError = require("../models/http-error.js");

const root = (req, res) => {
  res.json({ message: "Hello" });
};

const checkExistingUser = async (schema, email) => {
  // check if buyer exists
  let existingUser;
  try {
    existingUser = await schema.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return error;
  }
};

const createUser = async (createdUser) => {
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }
};

const signUpBuyer = async (req, res, next) => {
  const { name, email, password } = req.body;

  // check if buyer exists
  let error = await checkExistingUser(BuyerUser, email);
  if (error) {
    res
      .status(422)
      .json({ message: `User ${email} already exists, please login` });
    return next(error);
  }
  // buyer does not exist, create new entry
  const createdUser = new BuyerUser({
    name,
    email,
    password,
  });

  error = await createUser(createdUser);
  if (error) return next(error);

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const signUpSeller = async (req, res, next) => {
  const { name, email, password } = req.body;

  // check if seller exists
  let error = await checkExistingUser(SellerUser, email);
  if (error) {
    res
      .status(422)
      .json({ message: `User ${email} already exists, please login` });
    return next(error);
  }

  // seller does not exist, create new entry
  const createdUser = new SellerUser({
    name,
    email,
    password,
  });

  error = await createUser(createdUser);
  if (error) return next(error);

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password, accountType } = req.body;

  // find if user exists
  let existingUser;
  switch (accountType) {
    case "Buyer":
      existingUser = await BuyerUser.findOne({ email, password });
      break;
    case "Seller":
      existingUser = await SellerUser.findOne({ email, password });
    default:
      break;
  }

  if (!existingUser) {
    res.status(422).json({ message: "Invalid username or password" });
    return next(new HttpError("Invalid username or password", 404));
  }

  res.json({ message: "Logged in", user: existingUser.toObject({ getters: true }) });
};

exports.root = root;
exports.signUpBuyer = signUpBuyer;
exports.signUpSeller = signUpSeller;
exports.login = login;