const express = require("express");
const router = express.Router();
const fs = require('fs')
const User = require('../modules/User')
const Menu = require('../modules/Menu')
const MenuItem = require("../modules/MenuItem");
require("dotenv/config");

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

router.get("/menu-table/:userId", isLoggedIn, async (req, res) => {
  try {
    const menu = {
      cocktailMenuData: null,
      foodMenuData: null,
      beer_wineMenuData: null,
      qrCodeMenuData: null
    }
    const cocktailMenu = await Menu.findOne({ title: 'cocktailMenu' })
    menu.cocktailMenu = JSON.stringify(cocktailMenu?.data) || null
    const foodMenu = await Menu.findOne({ title: 'foodMenu' })
    menu.foodMenuData = JSON.stringify(foodMenu?.data) || null
    const beerMenu = await Menu.findOne({ title: 'beer_wineMenu' })
    menu.beer_wineMenuData = JSON.stringify(beerMenu.data?.sort((a, b) => -1 * b.type?.localeCompare(a.type))) || null
    const qrMenu = await Menu.findOne({ title: 'qrMenu' })
    menu.qrCodeMenuData = JSON.stringify(qrMenu?.data?.sort((a, b) => -1 * b.type?.localeCompare(a.type))) || null

    const qrMenuTypes = qrMenu.data?.map(x => (x.type))
    const qrOptions = qrMenuTypes.filter((c, index) => {
      return qrMenuTypes.indexOf(c) === index;
    });

    const beerMenuTypes = beerMenu.data?.map(x => (x.type))
    const beerMenuOptions = beerMenuTypes.filter((c, index) => {
      return beerMenuTypes.indexOf(c) === index;
    });

    console.log(req.query.qrMenu)
  
    return res.render("dashboard", {
      title: "Menu Table",
      isMenuTab: true,
      isAdmin: req.session.user?.isAdmin,
      user: req.session.user,
      cocktailMenuData: { data: JSON.parse(menu.cocktailMenu) },
      foodMenuData: { data: JSON.parse(menu.foodMenuData) },
      beer_wineMenuData: { data: JSON.parse(menu.beer_wineMenuData) },
      qrCodeMenuData: { data: JSON.parse(menu.qrCodeMenuData) },
      qrOptions: qrOptions,
      beerMenuOptions: beerMenuOptions
    });

  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get("/user-table/:userId", isLoggedIn, async (req, res) => {
  try {
    const users = await User.find({});
    const usersData = JSON.stringify(users)
    return res.render("dashboard", {
      title: "User Table",
      isUserTab: true,
      users: { data: JSON.parse(usersData) },
      isAdmin: req.session.user?.isAdmin,
      user: req.session.user});
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Render adminPage
router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    return res.render("dashboard", {
      title: "Dashboard",
      isDash: true,
      isAdmin:req.session.user?.isAdmin,
      user: req.session.user});
  } catch (error) {
    res.status(404).send({ message: error.message });
  }


  // try {
    // const users = await User.find({});
    // const usersData = JSON.stringify(users)
  //   const menu = {
  //     cocktailMenuData: null,
  //     foodMenuData: null,
  //     beer_wineMenuData: null,
  //     qrCodeMenuData: null
  //   }
  //   const cocktailMenu = await Menu.findOne({ title: 'cocktailMenu' })
  //   menu.cocktailMenu = JSON.stringify(cocktailMenu?.data) || null
  //   const foodMenu = await Menu.findOne({ title: 'foodMenu' })
  //   menu.foodMenuData = JSON.stringify(foodMenu?.data) || null
  //   const beerMenu = await Menu.findOne({ title: 'beer_wineMenu' })
  //   menu.beer_wineMenuData = JSON.stringify(beerMenu.data?.sort((a, b) => -1 * b.type?.localeCompare(a.type))) || null
  //   const qrMenu = await Menu.findOne({ title: 'qrMenu' })
  //   menu.qrCodeMenuData = JSON.stringify(qrMenu?.data?.sort((a, b) => -1 * b.type?.localeCompare(a.type))) || null

  //   const qrMenuTypes = qrMenu.data?.map(x => (x.type))
  //   const qrOptions = qrMenuTypes.filter((c, index) => {
  //     return qrMenuTypes.indexOf(c) === index;
  //   });

  //   const beerMenuTypes = beerMenu.data?.map(x => (x.type))
  //   const beerMenuOptions = beerMenuTypes.filter((c, index) => {
  //     return beerMenuTypes.indexOf(c) === index;
  //   });


  
  //   return res.render("dashboard", {
  //     title: "Dashboard",
  //     isDash: true,
  //     user: req.session.user,
  //     users: { data: JSON.parse(usersData) },
  //     cocktailMenuData: { data: JSON.parse(menu.cocktailMenu) },
  //     foodMenuData: { data: JSON.parse(menu.foodMenuData) },
  //     beer_wineMenuData: { data: JSON.parse(menu.beer_wineMenuData) },
  //     qrCodeMenuData: { data: JSON.parse(menu.qrCodeMenuData) },
  //     isAdmin: req.session.user.isAdmin,
  //     qrOptions: qrOptions,
  //     beerMenuOptions: beerMenuOptions
  //   });

  // } catch (error) {
  //   res.status(404).send({ message: error.message });
  // }
});

// POST REQUESTS

// POST/UPDATE Menu
router.post('/:option', isLoggedIn,  async (req, res, next) => {
  const body = { ...req.body, menuTitle: req.params.option }
  if (!body._id) {
    delete body._id
  }
  try {
    const findMenu = await Menu.findOne({ title: req.params.option })
    if (!findMenu) {
      const newMenu = new Menu({
        title: req.params.option,
        author: req.session.user?.username || 'admin',
        data: [body],
      })
      await newMenu.save()
      return res.redirect(`/menu-table/${req.session.user?._id}`)
    } else {
      Menu.findOne({ title: req.params.option }, async (err, menu) => {
        let items = menu.data;
        const menuitemId = body._id
        if (!menuitemId) {
          const newMenuItem = new MenuItem(body)
          await Menu.updateOne({ title: req.params.option },
            { $push: { data: newMenuItem } }
          )
          return res.redirect(`/menu-table/${req.session.user?._id}`)
        } else {

          for (i = 0; i < items.length; i++) {
            if (items[i]._id.toString() === menuitemId) {
              if (menu.title === 'beer_wineMenu' || menu.title === 'qrMenu') {
                items[i].type = body.type;
                items[i].name = body.name;
                items[i].price = body.price;
                items[i].description = body.description;
              } else {
                items[i].name = body.name;
                items[i].price = body.price;
                items[i].description = body.description;
              }
              await menu.save((err, data) => {
                if (err) throw err;
                console.info("item updated", data);
              });
              return res.redirect(`/menu-table/${req.session.user?._id}`)
            }
          }
        }

      })
    }

  } catch (error) {
    res.status(404).send({ message: error.message });
  }
})


// DELETE REQUESTS

//DELETE item by id
router.delete('/menu/item', async (req, res) => {
  try {
    const body = { ...req.body }
    await Menu.findOneAndUpdate({ 'data._id': body.id.toString() },
      { $pull: { data: { _id: body.id } } }
    )
    res.status(200).end("OK");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
})


//Helper Function - Authenticated
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return !req.session.user.role ? res.redirect('/authenticate/verification') : next()
  }
  return res.redirect('/login')

  // res.render('pages/verification', {title: 'Verification', isBody: 'bg-gradient-primary'})
}

//Redirect 404
router.use("*", (req, res) => {
  res.render("/pages/error", { title: "Error" });
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
