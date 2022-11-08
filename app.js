const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const supplements = require("./supplements.json");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home",{
    supplementsList: supplements
  });
});

app.get("/category/:category", (req, res) => {
  let categorySupplements = supplements.filter(
    (supplement) => supplement.type === req.params.category
  );
  res.render("category", {
    supplements: categorySupplements,
    supplementsList: supplements
  });
});

app.get("/category/:category/:category2", (req, res) => {
  let categorySupplements = supplements.filter(
    (supplement) => supplement.type === req.params.category
  );
  let categoryTowSupplements = supplements.filter(
    (supplement) => supplement.type === req.params.category2
  );
  res.render("category", {
    supplements: categorySupplements,
    secondarySupplements: categoryTowSupplements,
    supplementsList: supplements
  });
});

app.get("/category/:category/info/:name", (req, res) => {
  let supplement = supplements.find(
    (supplement) =>
      supplement.type === req.params.category &&
      supplement.name === req.params.name
  );
  res.render("supplement info", {
    supplement: supplement,
    supplementsList: supplements
  });
});

app.get("/recommended", (req, res) => {
  res.render("recommended stores",{
    supplementsList: supplements
  });
});

app.post("/search", (req, res) => {
  var searched = supplements.find(supplement => supplement.name === req.body.supplement)
  if(searched !== undefined){
    res.redirect("/category/" + searched.type + "/info/" + searched.name)
  }else{
    res.redirect('back')
  }
})

app.get("/data", (req, res) => {
  res.send(JSON.stringify(supplements));
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
