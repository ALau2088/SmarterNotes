const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');


// Load Idea Model
require("../models/Idea");
const Idea = mongoose.model("ideas");

// Idea Index Page
router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({user: req.user.id}) // Finds ideas only created by logged in user
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

// Add Idea Form
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("ideas/add");
});

// Edit Idea Form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if(idea.user != req.user.id){
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/ideas');
    } else {
      res.render("ideas/edit", {
        idea: idea
      });
    }
  });
});

// Process Form for Add Note
router.post("/", ensureAuthenticated, (req, res) => {
  /*
  console.log(req.body);
  res.send('ok');
  */
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
    console.log(errors);
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }

  // keeps user input from being deleted when error
  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details,
      data: req.body.data
    });
  } else {
    // res.send('passed');
    console.log(req.body);
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      data: req.body.data,
      user: req.user.id
    };
    new Idea(newUser).save().then(idea => {
      req.flash("success_msg", "Note added");
      res.redirect("/ideas");
    });
  }
});

// Edit Form process
router.put("/:id", ensureAuthenticated, (req, res) => {
  // res.send('PUT');
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.data = req.body.data;

    //save method from mongoose
    idea.save().then(idea => {
      req.flash("success_msg", "Note updated");
      res.redirect("/ideas");
    });
  });
});

// Delete Idea
router.delete("/:id", ensureAuthenticated, (req, res) => {
  // res.send('DELETE');
  Idea.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Note deleted");
    res.redirect("/ideas");
  });
});

module.exports = router;
