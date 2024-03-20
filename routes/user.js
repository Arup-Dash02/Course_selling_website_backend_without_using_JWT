// const express = require("express");
// const router = express.Router();

const { Router } = require("express");
const { User, Course } = require("../db");
const userMiddleWare = require("../middleware/user");
const router = Router();

router.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });

  res.json({
    message: "User created successfully",
  });
});

router.get("/courses", async function (req, res) {
  //in this endpoint any one can see all the courses.so there is no userMiddleware
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleWare, async function (req, res) {
  // It is most important
  //in the postman we have to send request by
  //http://localhost:3000/user/courses/65fa0237d19ec7a89f41f475
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    message: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", async function (req, res) {
  //Lists all the courses purchased by the user.
  const user = await User.findOne({
    username: req.headers.username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    courses: courses,
  });
});

module.exports = router;
