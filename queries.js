var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/catsordogs';
var db = pgp(connectionString);

function getAllNames(req, res, next) {
  db.any('select * from cd')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleName(req, res, next) {
  var nameID = parseString(req.params.id);
  db.one('select * from cd where name = $1', nameID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE name'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createName(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into cd(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllNames: getAllNames,
  getSingleName: getSingleName,
};
