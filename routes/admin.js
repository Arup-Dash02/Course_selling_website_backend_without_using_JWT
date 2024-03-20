const express = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();

router.post("/signup", async function (req, res) {
  //admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  //check if a user with this username already exists
  await Admin.create({
    username: username,
    password: password,
  });

  res.json({
    message: "Admin created successfully",
  });
});

router.post("/courses", adminMiddleware, async function (req, res) {
  //implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  //You should do input validation using zod because user can send as his wish

  //   Course.create({
  //     title: title,
  //     description: description,
  //     imageLink: imageLink,
  //     price: price,
  //   });
  //the below code is same as above.It is used when the key and value are the same
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  //the create function returns the details with the unique id created in the mognoDB automatically.
  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async function (req, res) {
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

module.exports = router;
