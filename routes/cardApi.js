const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models');
const Card = db.Card;

router.route('/')
  .get((req, res) => {
    Card.findAll()
    .then( card => {
      res.json(card);
    })
    .catch((err) => {
      res.json(err);
    })
  })
  .post((req,res) => {
    console.log(req.body);
    Card.create({
      title: req.body.title,
      priority: req.body.priority,
      status: 'queue',
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo
    })
    .then(function (card) {
      res.send(card)
      // res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
  })
  .put((req, res) => {
    Card.update({
      title: req.body.title,
      priority: req.body.priority,
      status: req.body.status,
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
    console.log(req);
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
