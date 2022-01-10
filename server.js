const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

const port = process.env.PORT || 5000; // listen to heroku assigned port, or default to 5000

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/user-routes');
const itemRoutes = require('./routes/item-routes');

app.use("/api/user", userRoutes)
app.use("/api/item", itemRoutes)

//
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

mongoose
  .connect(
    `mongodb+srv://test:testpw@cluster0.4ppgm.mongodb.net/health4u?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
    console.log(`Connected to MongoDB on port ${port}`);
  })
  .catch(err => {
    console.log(err);
  });

