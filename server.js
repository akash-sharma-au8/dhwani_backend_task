const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

const config = require("config");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// initialize express middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

// setting up cloudinary config

cloudinary.config({
  cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});

// Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const stateRoutes = require("./routes/state");
const districtRoutes = require("./routes/district");
const childRoutes = require("./routes/child");

// app.get("/", (req, res) => {
//   res.send("Health OK");
// });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/district", districtRoutes);
app.use("/api/child", childRoutes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
