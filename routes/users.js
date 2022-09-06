const express = require("express");
const router = express.Router();
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

router.get("/:userId", async (req, res) => {
   const user = await User.findOne({_id: req.params.userId})
   if (!user) return res.json({message: 'user not found'})
   return res.json(user)
});

router.get("/password/:userId", isLoggedIn, (req, res) => {
  res.render("pages/updatePassword", {
    title: "Update Password",
    user: {data: req.session.user, userId: req.session.user._id},
    isBody: "bg-gradient-primary",
  });
});

// create user
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

router.put('/:userId', async (req, res) => {
  const currentUser = req.body
  const user = await User.findOne({_id: req.params.userId})
  try {
    if (!user) throw new Error('user not found')
    await User.findOneAndUpdate({ _id: user._id}, currentUser, { upsert: true })
  } catch (error) {
    return res.status(404).json({message: error.message})
  }
  const result = {...user._doc, ...currentUser}
  return res.status(200).json({message: 'updated', user: result})
})

router.post("/password/:userId", (req, res, next) => {
  const password = req.body.password;
  const rePassword = req.body.rePassword;
  User.findOne({ _id: req.params.userId }, async (err, user) => {
    try {
      if (err) throw new Error(err);
      if (!user) {
        req.session.reset();
       return res.status(404).redirect("/login");
      }
  
      if (password != rePassword)
        return res.status(404).render("/pages/updatePassword", {
          title: "Update Password",
          errorMsg: "Passwords do not match",
          user: {data: user, userId: user._id.toString()},
          isBody: "bg-gradient-primary"
        });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(rePassword, salt);
      user.save((err, user) => {
        if (err) throw new Error(err);
        return res
          .status(200)
          .render("/pages/success", {
            title: "Dashboard",
            user: req.session.user,
            isPassword: true,
          });
      });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  });
});

// DELETE REQUESTS
router.delete('/:userId', async (req, res) => {
  const user = await User.findOne({_id: req.params.userId})
  if (!user) return res.status(404).json({message: 'user not found'})
  await User.deleteOne({ _id: user._id });
  return res.status(200).json({message: 'deleted', user})
})


function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return !req.session.user.role ? res.status(401).redirect('/authenticate/verification') : next()
  }
  return res.redirect('/login')
}

module.exports = router;
