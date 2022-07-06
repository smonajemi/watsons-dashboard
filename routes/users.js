var express = require("express");
var router = express.Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
  try {
    User.find({}, (err, users) => {
      if (err) throw new Error(err);
      const results = { users: users };
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  User.findOne({ username: req.body.username }, (err, user) => {
    try {
      if (err) throw new Error(err);
      if (user)
        res
          .status(400)
          .json({ message: `username ${req.body.username} already exists` });
      else {
        const newUser = new User(req.body);
        newUser
          .save()
          .then((data) => res.status(201).send(data))
          .catch((e) => {
            res.status(201).json({ message: e });
          });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});

router.post("/:username", isLoggedIn, (req, res, next) => {
  const currentUser = req.session.user;
  const newPassword = req.body.newPassword;
  const repeatedPassword = req.body.repeatedPassword;

  User.findOne({ _id: currentUser._id }, async (err, user) => {
    try {
      if (err) throw new Error(err);
      if (!user) {
        req.session.reset();
        res.redirect("login");
      }
      if (newPassword != repeatedPassword)
        return res.render("partials/passwordModal", {
          title: "Update Password",
          errorMsg: "Passwords do not match",
          user: req.session.user,
        });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(repeatedPassword, salt);
      user.save((err, user) => {
        if (err) throw new Error(err);
        return res.status(200).redirect("/");
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
});
function isLoggedIn(req, res, next) {
  !req.session.user ? res.redirect("login") : next();
}

module.exports = router;
