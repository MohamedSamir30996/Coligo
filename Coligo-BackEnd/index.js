const jwt = require("jsonwebtoken");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");
const userRoute = require("./routes/userRoute");
const announcementRoute = require("./routes/announcementRoute");
const subjectRoute = require("./routes/subjectRoute");
const questionRoute = require("./routes/questionRoute");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require("cookie-parser")
app.use(cookieParser());

//middle
app.use(express.json());

// handle cors  // any domain
const _cor = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(_cor));

//  handle path
app.use("/users", userRoute); 
app.use("/announcements", announcementRoute);
app.use("/subjects", subjectRoute);
app.use("/questions", questionRoute);

// connect to database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(function () {
    console.log("Cloigo db is connect");
  })
  .catch(function (err) {
    console.log(err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening =>`);
});

//error haddling Middleware
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const User = require("./models/userModel");
app.use(notFound);
app.use(errorHandler);