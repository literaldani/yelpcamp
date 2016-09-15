var express = require("express");
var bodyParser = require("body-parser")
var app = express();



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


var campgrounds = [
        {name: "Choroni", img: "http://runrun.es/wp-content/uploads/2015/04/Choron%C3%AD.jpg"},
        {name: "Hundicion Yay", img: "http://www.venelogia.com/uploads/2010/HundiciondeYay.jpg"},
        {name: "Choroni", img: "http://runrun.es/wp-content/uploads/2015/04/Choron%C3%AD.jpg"},
        {name: "Hundicion Yay", img: "http://www.venelogia.com/uploads/2010/HundiciondeYay.jpg"},
        {name: "Choroni", img: "http://runrun.es/wp-content/uploads/2015/04/Choron%C3%AD.jpg"},
        {name: "Hundicion Yay", img: "http://www.venelogia.com/uploads/2010/HundiciondeYay.jpg"},
        {name: "Cascada del vino", img: "http://static1.absolut-venezuela.com/wp-content/uploads/2012/05/Cascada-del-Vino.jpg"}
    ];


app.get("/", function (req, res) {
   res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, img: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server UP");
});