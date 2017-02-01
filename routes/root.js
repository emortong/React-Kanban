const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models');
const Card = db.Card;


router.route('/')
  .get((req, res) => {
    console.log(req);
    Card.findAll()
    .then( card => {
      console.log(card);
      res.send('../public/index.html');
    })
    .catch((err) => {
      console.log(err.errors);
      res.json(err.errors[0].message);
    })
  })
  .post((req,res) => {
    console.log(req.body);
    Card.create({
      title: req.body.title,
      priortity: req.body.priority,
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo
    })
    .then(function (card) {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err.errors);
      res.json(err.errors[0].message);
    })
  })
  .put((req, res) => {
    Card.update({
      title: req.body.title,
      priortity: req.body.priority,
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo
    },{
      where: {
        id: req.body.id
      }
    })
    .then( card => {
        res.json(card);
    })
    .catch((err) => {
      console.log(err.errors);
      res.json(err.errors[0].message);
    })
  })
  .delete((req,res) => {
    Card.destroy({
      where: {
        id: req.body.id
      }
    })
    .then( card => {
        res.json(card)
    })
    .catch((err) => {
      console.log(err);
    })
  })

module.exports = router;
