    var express = require('express');
var router = express.Router();
var db = require('../queries');


router.get('/api/name', db.getAllNames);
router.get('/api/name/:id', db.getSingleName);
router.post('/api/puppies', db.createName);
router.put('/api/puppies/:id', db.updateName);
router.delete('/api/puppies/:id', db.removeName);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
