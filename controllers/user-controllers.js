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
  if (error) return next(error);

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
  checkExistingUser(SellerUser, email);

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

exports.root = root;
exports.signUpBuyer = signUpBuyer;
exports.signUpSeller = signUpSeller;
