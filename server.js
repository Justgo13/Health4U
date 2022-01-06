const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")

const app = express();
app.use(cors());
app.use(bodyParser.json());

const usersRoutes = require('./routes/user-routes');
const itemRoutes = require('./routes/item-routes');

app.use("/api/user", usersRoutes)
app.use("/api/item", itemRoutes)

mongoose
  .connect(
    `mongodb+srv://test:testpw@cluster0.4ppgm.mongodb.net/health4u?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

