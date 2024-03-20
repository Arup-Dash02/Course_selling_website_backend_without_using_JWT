const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json()); //This is very imp to translate the body to json format else our server can't read the body of the user
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(3000, function () {
  console.log("server is running on the port 3000");
});
