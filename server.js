const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
// bcrypt3.0.7沒辦法，安裝舊的3.0.6就可以了
// npm i bcrypt@3.0.6
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const app = express();
mongoose.connect(
  "mongodb+srv://James:bemeowcat1112@auth-kl52l.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post("/signup", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  console.log(newUser);
  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "email in use"
      });
    }
    return res.status(200).json({
      title: "signup success"
    });
  });
});

app.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: "server error",
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: "user not found",
        error: "invalid credentials"
      });
    }
    // incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login fail",
        error: "invalid credentials"
      });
    }
    // 全都成功之後 丟個 token到前端
    let token = jwt.sign({ userId: user._id }, "secretKey");
    return res.status(200).json({
      title: "login success",
      token: token
    });
  });
});

app.get("/user", (req, res, next) => {
  let token = req.headers.token; //從前端拿到的token
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: "unauthorized"
      });
    }
    // token認證成功
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          email: user.email,
          name: user.name
        }
      });
    });
  });
});

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`server is running onr port ${port}`);
});
