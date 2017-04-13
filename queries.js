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
  db.none('insert into cd(name, color, catsdogs)' +
      'values(${name}, ${color}, ${catsdogs})',
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

function updateName(req, res, next) {
    db.none('update cd set color=$2, catsdogs=$3 where name=$1',
        [req.body.name, req.body.color, req.body.catsdogs])
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


function updatePuppy(req, res, next) {
    db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
        [req.body.name, req.body.breed, parseInt(req.body.age),
            req.body.sex, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated puppy'
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
                    message: `Removed ${result.rowCount} name`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
  getAllNames: getAllNames,
  getSingleName: getSingleName,
  createName: createName,
  updateName: updateName,
  removeName: removeName,
};
