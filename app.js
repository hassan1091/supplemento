const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render(
    "home" /*, {
      content : homeStartingContent,
    }*/
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
