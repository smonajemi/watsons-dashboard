const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const upload = require("../middleware/upload");
const Grid = require("gridfs-stream");
const User = require('../modules/User')
const Menu = require('../modules/Menu')
const crypto = require('crypto');
const MenuItem = require("../modules/MenuItem");
const ObjectId = require('mongodb').ObjectID;
require("dotenv/config");

let gfs, gridBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  })
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection("uploads")
})

// GET REQUESTS
//Find Menu
router.get("/getMenu/:option", (req, res) => {
  const param = req.params.option;
  // console.log(req.params)
  gfs.files.findOne(
    { metadata: param},
    { sort: { uploadDate: -1 } },
    (err, file) => {
      return (!file || file.length === 0) ? res.status(404).json({ message: "No file exists" }) : res.status(200).redirect(`/menu/${file.filename}`);
    }
  )
})

router.get("/menu", async (req,res) => {
  const menu = await Menu.find({})
  return res.send(menu)
})
//Render Menu
router.get("/menu/:filename", (req, res) => {
  if (!req.params.filename)
      {
        const param = req.params.option
        gfs.files.findOne(
          { metadata: param},
          { sort: { uploadDate: -1 } },
          (err, file) => {
             return (!file || file.length === 0) ? res.status(404).json({ message: "No file exists" }) : res.status(200).redirect(`/menu/${file.filename}`);
          }
        )
  }
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0)
      return res.status(404).json({ message: "No file exists" })
    if (file.contentType === "application/pdf") {
      const readStream = gridBucket.openDownloadStream(file._id)
      res.contentType("application/pdf")
      readStream.pipe(res)
    } else {
      res.status(404).json({ error: "server error" })
    }
  })
})

//Render Login
router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login", isBody: "bg-gradient-primary" });
});

router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Sign Up", isBody: "bg-gradient-primary" });
});


//Redirect homePage
router.get("/", isLoggedIn, (req, res, next) => {
  res.redirect(`/${req.session.user._id}`);
});


//Render adminPage
router.get("/:userId", isLoggedIn, async (req, res) => {
  try {

    const users = await User.find({});
    const usersData = JSON.stringify(users)
    const menu = {
      cocktailMenuData: null,
      foodMenuData: null,
      beer_wineMenuData: null,
      qrCodeMenuData: null
    }
    const cocktailMenu = await Menu.findOne({title: 'cocktailMenu'})
    menu.cocktailMenu = JSON.stringify(cocktailMenu?.data) || null
    const foodMenu = await Menu.findOne({title: 'foodMenu'})
    menu.foodMenuData  = JSON.stringify(foodMenu?.data) || null
    const beerMenu = await Menu.findOne({title: 'beer_wineMenu'})
    menu.beer_wineMenuData = JSON.stringify(beerMenu?.data) || null
    const qrMenu = await Menu.findOne({title: 'qrMenu'})
    menu.qrCodeMenuData = JSON.stringify(qrMenu?.data) || null

    return res.render("dashboard", {
      title: "Dashboard",
      isDash: true,
      user: req.session.user,
      data: JSON.parse(usersData),
      cocktailMenuData: {data: JSON.parse(menu.cocktailMenu)},
      foodMenuData: {data: JSON.parse(menu.foodMenuData)},
      beer_wineMenuData: {data: JSON.parse(menu.beer_wineMenuData)},
      qrCodeMenuData: {data: JSON.parse(menu.qrCodeMenuData)},
      admin: (req.session.user.role).includes('Admin') ? true : false
    });

  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// POST REQUESTS
router.delete('/menu/item', async (req, res) => {
  try {
    const body = {...req.body}
    await Menu.updateOne({title: body.title},
      { $pull: { data: { _id: body.id } } }
    )
    res.status(200).end("OK");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
})
// POST/UPDATE Menu
router.post('/:option', async (req, res, next) => {
  const body = {...req.body, menuTitle: req.params.option}
  if (!body.id){
    delete body.id
  }
  try {
    const findMenu = await Menu.findOne({title: req.params.option})
    if (!findMenu) {
      console.log('here')
      const newMenu = new Menu({
        title: req.params.option,
        author: req.session.user?.username || 'default',
        data: [body],
      })
      await newMenu.save()
      return res.redirect('/')
    } else {
      console.log('here3')
      Menu.findOne({title: req.params.option}, async (err, menu) => {
        let items = menu.data;
        const menuitemId = body.id
        if (!menuitemId) {
            const newMenuItem = new MenuItem({
              menuTitle: req.params.option,
              name: req.body.name,
              price: req.body.price,
              description: req.body.description
            })
          await Menu.updateOne ({title: req.params.option},
              { $push: { data: newMenuItem} }
          )
          return res.redirect('/')
        } else {
          for ( i = 0; i < items.length; i++ ) {
            if (items[i]._id.toString() === menuitemId) {
                items[i].name = body.name;
                items[i].price = body.price;
                items[i].description = body.description;
                await menu.save((err,data) => {
                  if (err) throw err;
                  console.info("item updated", data);
                });
              return res.redirect('/')
             }
          }
        }
        
      })
    }

  } catch (error) {
    res.status(404).send({ message: error.message });
  }
})



//Helper Function - Authenticated
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return !req.session.user.role ? res.redirect('/authenticate/verification') : next()
  }
  return res.redirect('login')

  // res.render('pages/verification', {title: 'Verification', isBody: 'bg-gradient-primary'})
}

//Redirect 404
router.use("*", (req, res) => {
  res.render("pages/error", { title: "Error" });
});

// /** RULES OF API */
// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization')
//   if (req.method === 'OPTIONS') {
//       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
//       res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
//       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
//       return res.status(200).json({})
//   }
//   next()
// })
module.exports = router;
