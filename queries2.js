var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);

function getAllPuppies(req, res, next) {
  db.any('select * from pups')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from pups where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createName(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into cd(name, color, catsordogs)' +
      'values(${name}, ${color}, ${catsordogs})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one name'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateName(req, res, next) {
  db.none('update cd set name=$1, color=$2, catsordogs=$3,
    [req.body.name, req.body.color,
      req.body.catsordogs)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated name'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeName(req, res, next) {
  var nameID = parseString(req.params.name);
  db.result('delete from cd where name = $1', nameID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};
