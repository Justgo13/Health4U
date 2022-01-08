const SellerUser = require("../models/seller-user");
const BuyerUser = require("../models/buyer-user");
const HttpError = require("../models/http-error.js");

const getDate = () => {
  let date;
  let today = new Date();
  let month = today.toLocaleDateString("default", { month: "short" });
  let day = String(today.getDate()).padStart(2, "0");
  let year = today.getFullYear();

  date = `${month} ${day}, ${year}`;
  return date;
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

const saveUser = async (createdUser) => {
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

const getUser = async (schema, id) => {
  let user, error;
  try {
    user = await schema.findById(id);
  } catch (err) {
    error = new HttpError("Could not find user with id " + id, 500);
    return { user: null, error };
  }
  return { user, error };
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

  error = await saveUser(createdUser);
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

  error = await saveUser(createdUser);
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

  res.json({
    message: "Logged in",
    user: existingUser.toObject({ getters: true }),
  });
};

const addBookmark = async (req, res, next) => {
  const { id, itemID } = req.body;

  let { user, error } = await getUser(BuyerUser, id);
  if (error) {
    res.status(422).json({
      message: "Could not find user with id " + id,
    });
    return next(error);
  }

  const bookmarks = user.bookmarks;

  /**
   * bookmarks look like
   *  ["1", "2"]
   *
   * a list of unique item ids
   */

  if (!bookmarks.includes(itemID)) {
    bookmarks.push(itemID);
  }

  user.bookmarks = bookmarks;

  error = await saveUser(user);
  if (error) {
    res.status(500).json({ message: "Failed to save bookmark" });
    return next(error);
  }

  res.status(200).json({ bookmarks: user.bookmarks });
};

const getBookmarks = async (req, res, next) => {
  const userID = req.params.userID;
  let { user, error } = await getUser(BuyerUser, userID);
  if (error) {
    res.status(422).json({
      message: "Could not find user with id " + userID,
    });
    return next(error);
  }

  res.json({ bookmarks: user.bookmarks });
};

const removeBookmark = async (req, res, next) => {
  const { id, itemID } = req.body;
  let { user, error } = await getUser(BuyerUser, id);
  if (error) {
    res.status(422).json({
      message: "Could not find user with id " + id,
    });
    return next(error);
  }

  let bookmarks = user.bookmarks;

  bookmarks = bookmarks.filter((bookmark) => bookmark !== itemID);

  user.bookmarks = bookmarks;
  
  error = await saveUser(createdUser);
  if (error) return next(error);
  res.status(200).json({ bookmarks: user.bookmarks });
};

const addOrder = async (req, res, next) => {
  const { id, cartItems } = req.body;

  let { user, error } = await getUser(BuyerUser, id);
  if (error) {
    res.status(422).json({
      message: "Could not find user with id " + id,
    });
    return next(error);
  }

  const orderDate = getDate();

  // cart empty or entry with order date does not exist
  if (user.cart.length === 0 || !user.cart.find((entry) => entry.orderDate)) {
    user.cart.push({
      cartItems,
      orderDate,
    });
  } else {
    // cart entry exists, append list to existing list
    const existingCart = user.cart.find(
      (entry) => entry.orderDate === orderDate
    );
    const exisitingCartIndex = user.cart.indexOf(existingCart);
    const existingCartItems = existingCart.cartItems;

    cartItems.forEach((item) => {
      if (!existingCartItems.includes(item)) {
        existingCartItems.push(item);
      }
    });

    existingCart.cartItems = existingCartItems;
    user.cart[exisitingCartIndex] = existingCart;
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Could not save cart for user with id " + id,
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: "Added order",
    cart: user.cart.toObject({ getters: true }),
  });
};

const getCartHistory = async (req, res, next) => {
  const userID = req.params.userID;

  let { user, error } = await getUser(BuyerUser, userID);
  if (error) {
    res.status(422).json({
      message: "Could not find user with id " + userID,
    });
    return next(error);
  }

  res.json({ cart: user.cart.toObject({ getters: true }) });
};

const getSellerItems = async (req, res, next) => {
  const userID = req.params.userID;

  let { user, error } = await getUser(SellerUser, userID);
  if (error) {
    res.status(422).json({
      message: "Could not find user with id " + userID,
    });
    return next(error);
  }

  res.json({ items: user.items.toObject({ getters: true }) });
};

const editUser = async (req, res, next) => {
  const { userID, name, email } = req.body;

  // try to update user in both tables
  try {
    await BuyerUser.findByIdAndUpdate(userID, { name, email });
    await SellerUser.findByIdAndUpdate(userID, { name, email });
  } catch (err) {
    const error = new HttpError(`Could not update user with id ${userID}`, 500);
    return next(error);
  }

  res.status(203).json({ message: "Updated user" });
};

exports.signUpBuyer = signUpBuyer;
exports.signUpSeller = signUpSeller;
exports.login = login;
exports.addBookmark = addBookmark;
exports.getBookmarks = getBookmarks;
exports.removeBookmark = removeBookmark;
exports.addOrder = addOrder;
exports.getCartHistory = getCartHistory;
exports.getSellerItems = getSellerItems;
exports.editUser = editUser;
