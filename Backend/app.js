const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const photoRoutes = require("./router/photoRoutes");
const contactRoutes = require("./router/contactRoutes");
const path = require("path");
dotenv.config({ path: "./.env" });
require("./db/conn");

app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(require("./router/user"));
// app.use("/api/photos", photoRoutes);
app.use(require("./router/photoRoutes"))
app.use(require("./router/contactRoutes"))

// app.use("/contact", contactRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
