


// re-usable

// let gfs, gridBucket;
// const conn = mongoose.connection;
// conn.once("open", () => {
//   gridBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "uploads",
//   })
//   gfs = Grid(conn.db, mongoose.mongo)
//   gfs.collection("uploads")
// })

// GET REQUESTS
//Find Menu
// router.get("/getMenu/:option", (req, res) => {
//   const param = req.params.option;
//   // console.log(req.params)
//   gfs.files.findOne(
//     { metadata: param},
//     { sort: { uploadDate: -1 } },
//     (err, file) => {
//       return (!file || file.length === 0) ? res.status(404).json({ message: "No file exists" }) : res.status(200).redirect(`/menu/${file.filename}`);
//     }
//   )
// })

//Render Menu
// router.get("/menu/:filename", (req, res) => {
//   if (!req.params.filename)
//       {
//         const param = req.params.option
//         gfs.files.findOne(
//           { metadata: param},
//           { sort: { uploadDate: -1 } },
//           (err, file) => {
//              return (!file || file.length === 0) ? res.status(404).json({ message: "No file exists" }) : res.status(200).redirect(`/menu/${file.filename}`);
//           }
//         )
//   }
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file || file.length === 0)
//       return res.status(404).json({ message: "No file exists" })
//     if (file.contentType === "application/pdf") {
//       const readStream = gridBucket.openDownloadStream(file._id)
//       res.contentType("application/pdf")
//       readStream.pipe(res)
//     } else {
//       res.status(404).json({ error: "server error" })
//     }
//   })
// })

// router.post("/menu", upload.single("file"), (req, res) => {
//   const formFile = req.file;
//   try {
//     if (formFile.mimetype !== "application/pdf")
//       return res.render("dashboard", {
//         title: "Dashboard",
//         errorMsg: "pdf files only",
//       });
//   } catch (error) {
//     req.file = null;
//     res.render("pages/error", { title: "Error" });
//   }
//   const str = req.file.metadata.replace("Menu", "");
//   const metadata = str.charAt(0).toUpperCase() + str.slice(1);
//   res.render("pages/success", {
//     title: "Dashboard",
//     user: req.session.user,
//     menu: req.file.originalname,
//     uploadedFile: metadata,
//     isMenu: true,
//   });
// });