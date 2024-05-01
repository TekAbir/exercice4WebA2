require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT;
const helmet = require("helmet");
const webRouter = require("./routes/web");

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources/views"));

app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use("/", webRouter)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
