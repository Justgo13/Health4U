const Item = require("../models/item");
const SellerUser = require("../models/seller-user");
const HttpError = require("../models/http-error.js");

const BAD_IMAGE_URL = "https://community.atlassian.com/t5/image/serverpage/image-id/127481i2A3E643B5F41B152/image-dimensions/383x383?v=v2"

const checkExistingItem = async (name, category) => {
  let exisitingItem;
  try {
    exisitingItem = await Item.findOne({ name, category });
  } catch (err) {
    const error = new HttpError("Finding item failed", 500);
    return error;
  }

  if (exisitingItem) {
    const error = new HttpError("Item already exists", 422);

    return error;
  }
};

const saveItem = async (item) => {
  try {
    await item.save();
  } catch (err) {
    const error = new HttpError("Creating item failed", 500);
    return error;
  }
};

const hasImageExtension = (imageURL) => {
  const ext = imageURL.split(".").pop().toLowerCase()
  return ["png", "jpg", "jpeg"].includes(ext)
}

const addItem = async (req, res, next) => {
  let { sellerID, name, category, description, image, price } = req.body;

  price = parseFloat(price).toFixed(2);

  // check if item exists
  let error = await checkExistingItem(name, category);

  if (error) {
    res
      .status(422)
      .json({ message: `Item ${name} in category ${category} already exists` });
    return next(error);
  }

  // replace image with default image not found if passed in image url is invalid
  if (!hasImageExtension(image)) {
    image = BAD_IMAGE_URL
  }

  // item does not exist, create new entry
  const createdItem = new Item({
    name,
    category,
    description,
    image,
    price,
  });

  error = await saveItem(createdItem);
  if (error) return next(error);

  // get seller entry
  let seller;
  try {
    seller = await SellerUser.findById(sellerID);
  } catch (err) {
    const error = new HttpError("Finding item failed", 500);
    return next(error);
  }

  // add item id to seller items list if it doesn't already exist

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
  // get item by item id
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

  // itemIDs is a list of MongoDB IDs ["1", "2"], we want to resolve these ids into
  // mongodb item entries [{name, category, description, image, price, rating},...]

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

  // delete item
  try {
    await Item.findByIdAndDelete(itemID);
  } catch (err) {
    return next(new HttpError(`Failed to delete item ${itemID}`, 422));
  }

  // find item in seller list
  let user;
  try {
    user = await SellerUser.findById(sellerID);
  } catch (err) {
    return next(new HttpError(`Failed to delete item ${itemID}`, 422));
  }

  var itemIndex = user.items.indexOf(itemID);
  user.items.splice(itemIndex, 1);

  // delete itemID from seller list
  try {
    await user.save();
  } catch (err) {
    return next(new HttpError(`Failed to delete item ${itemID}`, 422));
  }
  res.status(201).json({ message: `Item ${itemID} deleted` });
};

const editItem = async (req, res, next) => {
  const { itemID, name, category, description, image, price } = req.body;

  // update item
  let item;
  try {
    await Item.findByIdAndUpdate(itemID, {
      name,
      category,
      description,
      image,
      price,
    });
  } catch (err) {
    return next(new HttpError(`Failed to edit item ${itemID}`, 422));
  }

  // get the edited item so that it can be passed as response
  try {
    item = await Item.findById(itemID);
  } catch (err) {
    return next(new HttpError(`Failed to edit item ${itemID}`, 422));
  }
  res.status(201).json({
    message: "Edited item",
    editedItem: item.toObject({ getters: true }),
  });
};

const getItems = async (req, res, next) => {
  let items
  try {
    items = await Item.find({});
  } catch (err) {
    throw err;
  }

  items = items.map(item => item.toObject({getters: true}))
  res.json({ items });
};

exports.addItem = addItem;
exports.getItem = getItem;
exports.resolveItemIds = resolveItemIds;
exports.deleteItem = deleteItem;
exports.editItem = editItem;
exports.getItems = getItems;
