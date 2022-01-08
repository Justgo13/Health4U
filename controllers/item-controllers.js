const Item = require("../models/item");
const SellerUser = require("../models/seller-user");
const HttpError = require("../models/http-error.js");

const addItem = async (req, res, next) => {
  let { sellerID, name, category, description, image, price } = req.body;

  price = parseFloat(price).toFixed(2);

  // check if item exists
  let exisitingItem;
  try {
    exisitingItem = await Item.findOne({ name, category });
  } catch (err) {
    const error = new HttpError("Finding item failed", 500);
    return next(error);
  }

  if (exisitingItem) {
    const error = new HttpError("Item already exists", 422);
    res
      .status(422)
      .json({ message: `Item ${name} in category ${category} already exists` });
    return next(error);
  }

  // item does not exist, create new entry
  const createdItem = new Item({
    name,
    category,
    description,
    image,
    price,
  });

  try {
    await createdItem.save();
  } catch (err) {
    const error = new HttpError("Creating item failed", 500);
    return next(error);
  }

  // add item id to seller items list
  let seller;
  try {
    seller = await SellerUser.findById(sellerID);
  } catch (err) {
    const error = new HttpError("Finding item failed", 500);
    return next(error);
  }

  let itemID = createdItem._id.toString();
  if (!seller.items.includes(itemID)) {
    seller.items.push(itemID);
  }

  try {
    await seller.save();
  } catch (err) {
    const error = new HttpError("Failed to save seller item", 500);
    return next(error);
  }

  res.status(201).json({ item: createdItem.toObject({ getters: true }) });
};

const getItem = async (req, res, next) => {
  const itemID = req.params.itemID;

  let exisitingItem;
  try {
    exisitingItem = await Item.findById(itemID);
  } catch (err) {
    const error = new HttpError("Finding item failed", 500);
    return next(error);
  }

  res.json({ item: exisitingItem.toObject({ getters: true }) });
};

const resolveItemIds = async (req, res, next) => {
  let { itemIDs } = req.body;

  // itemIDs is a list of MongoDB IDs

  for (let i = 0; i < itemIDs.length; i++) {
    let exisitingItem;
    try {
      exisitingItem = await Item.findById(itemIDs[i]);
    } catch (err) {
      const error = new HttpError("Finding item failed", 500);
      return next(error);
    }

    itemIDs[i] = exisitingItem;
  }

  // turn mongoDB _id to id

  itemIDs = itemIDs.map((item) => item.toObject({ getters: true }));
  res.json({ resolvedItems: itemIDs });
};

const deleteItem = async (req, res, next) => {
  const { sellerID, itemID } = req.body;

  try {
    await Item.findByIdAndDelete(itemID);
  } catch (err) {
    return next(new HttpError(`Failed to delete item ${itemID}`, 422));
  }

  // delete itemID from seller list

  let user;
  try {
    user = await SellerUser.findById(sellerID);
  } catch (err) {
    return next(new HttpError(`Failed to delete item ${itemID}`, 422));
  }

  var itemIndex = user.items.indexOf(itemID);
  user.items.splice(itemIndex, 1);

  try {
    await user.save();
  } catch (err) {
    return next(new HttpError(`Failed to delete item ${itemID}`, 422));
  }
  res.status(201).json({ message: `Item ${itemID} deleted` });
};

const editItem = async (req, res, next) => {
  const { itemID, name, category, description, image, price } = req.body;

  let item;
  try {
    await Item.findByIdAndUpdate(itemID, {name, category, description, image, price});
  } catch (err) {
    return next(new HttpError(`Failed to edit item ${itemID}`, 422));
  }

  // get the just edited item for returning
  try {
    item = await Item.findById(itemID);
  } catch (err) {
    return next(new HttpError(`Failed to edit item ${itemID}`, 422));
  }
  res.status(201).json({message: "Edited item", editedItem: item.toObject({getters: true})})
};

exports.addItem = addItem;
exports.getItem = getItem;
exports.resolveItemIds = resolveItemIds;
exports.deleteItem = deleteItem;
exports.editItem = editItem;
