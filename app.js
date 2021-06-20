const express = require("express");
const path = require("path");
const app = express();
var bodyParser = require("body-parser");
const fs = require("fs");
const port = process.env.PORT || 300;

//MONGODB
const mongoose = require("mongoose");
const { request } = require("http");
// mongoose.connect("mongodb://localhost/contactQuery", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose
  .connect("mongodb://localhost:27017/cafeteria_details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => {
    console.log(`no connection`);
  });

//mongoose code for signup form

const signupSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  org_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  emp_no: {
    type: Number,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

//now we have created a collection
const Signup = mongoose.model("Signup", signupSchema);

// database contact

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

//schema
const Contact = mongoose.model("Contact", contactSchema);
//EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // for serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//PUG SPECIFIC STUFF
app.set("view engine", "pug"); //set the template engine as pug
app.set("views", path.join(__dirname, "views")); //set the views directory

//ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  //to get the data in moongosse through express we need body parser
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      // res.send("THIS ITEMS HAS SAVED IN COLLECTIONS OF DATA BASE")
      res.status(200).render("home.pug");
    })
    .catch(() => {
      res.status(400).send("this item was not saved in database");
    });
  // res.status(200).render('contact.pug')
});

app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about_us.pug", params);
});
//login page
app.get("/login", (req, res) => {
  const params = {};
  res.status(200).render("login.pug", params);
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //console.log(`${email} and password is ${password}`);
  const useremail = await Signup.findOne({ email: email });
  //   res.send(useremail.password);
  //   console.log(useremail);
  if (useremail.password === password) {
    res.status(200).render("menucard.pug");
  } else {
    res.send("data might be invaild");
  }
});
// signup page

app.get("/signup", (req, res) => {
  const params = {};
  res.status(200).render("signup.pug", params);
});

app.post("/signup", (req, res) => {
  //to get the data in moongosse through express we need body parser
  var myData = new Signup(req.body);
  const password = req.body.password;
  const cpassword = req.body.confirmpassword;
  if (password === cpassword) {
    myData.save().then(() => {
      res.status(200).render("login.pug");
    });
  } else {
    res.status(400).send("data may be duplicated please check once");
  }
});

app.get("/menu", (req, res) => {
  const params = {};
  res.status(200).render("menucard.pug", params);
});

// START THE SERVER
app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
