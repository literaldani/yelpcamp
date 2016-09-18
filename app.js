var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Hundicion Yay", img: "http://www.venelogia.com/uploads/2010/HundiciondeYay.jpg"
// }, function(err,camp){
//     if (err) {
//         console.log("Algo salio mal");
//     } else {
//         console.log("agregado campground");
//         console.log(camp);
//     }
// });

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
    // res.render("campgrounds", {campgrounds: campgrounds});
    Campground.find({},function (err,camps) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: camps});
        }
    });
});


app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    // var newCampground = {name: name, img: image};
    // campgrounds.push(newCampground);
    Campground.create({
        name: name,
        img: image
    }, function (err) {
        if (err) {
            console.log("Algo salio mal");
        } else {
            res.redirect("/campgrounds");        
        }
    });
    
    
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server UP on  port: " + process.env.PORT + " " + process.env.IP);
});