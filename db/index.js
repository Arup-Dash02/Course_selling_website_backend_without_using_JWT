const mongoose = require("mongoose");

//connect to mongoDB
mongoose.connect(
  "mongodb+srv://Arup_Dash:dash%40232001@cluster0.7uzfzby.mongodb.net/courses"
);

//define schemas
const AdminSchema = new mongoose.Schema({
  //schema definitions
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = { Admin, User, Course };
