    var express = require('express');
var router = express.Router();
var db = require('../queries');


router.get('/api/listnames', db.getAllNames);
router.get('/api/listname/:id', db.getSingleName);
router.post('/api/createname', db.createName);
router.put('/api/updatename/:id', db.updateName);
router.delete('/api/removename/:id', db.removeName);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'webapp'}); 
});

module.exports = router;
