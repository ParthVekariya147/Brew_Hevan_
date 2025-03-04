const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const inventoryRoutes = require("./Backend/router/inventoryRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));


app.use("/api/inventory", inventoryRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
