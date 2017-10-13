'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require('mysql2');

var mysql = _interopRequireWildcard(_mysql);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query = function () {
  function Query(statement, values) {
    _classCallCheck(this, Query);

    this.statement = statement;
    this.values = values || [];
  }

  _createClass(Query, [{
    key: 'whereIn',
    value: function whereIn(column, values) {
      this.statement += ' AND ' + column + ' IN (?)';
      this.values.push(values);
    }
  }, {
    key: 'whereNotIn',
    value: function whereNotIn(column, values) {
      this.statement += ' AND ' + column + ' NOT IN (?)';
      this.values.push(values);
    }
  }, {
    key: 'whereLike',
    value: function whereLike(column, searchQuery) {
      this.statement += " AND " + column + " LIKE CONCAT('%', ?, '%')";
      this.values.push(searchQuery);
    }
  }, {
    key: 'orderBy',
    value: function orderBy(columns) {
      this.statement += ' ORDER BY ' + columns;
    }
  }, {
    key: 'limitOffset',
    value: function limitOffset(limit, offset) {
      if (!this.values) this.values = [];

      if (limit >= 0) {
        this.statement += ' LIMIT ?';
        this.values.push(limit);
        if (offset > 0) {
          this.statement += ' OFFSET ?';
          this.values.push(offset);
        }
      } else if (offset > 0) {
        this.statement += ' LIMIT 18446744073709551615 OFFSET ?';
        this.values.push(offset);
      }
    }
  }, {
    key: 'execute',
    value: function execute(onSuccess, onError) {
      var _this = this;

      _db2.default.connection.execute(this.statement, this.values, function (error, rows) {
        if (error) {
          var sql = mysql.format(_this.statement, _this.values);
          console.error(error);
          console.trace('Query failed: ' + sql);
          return onError(error);
        } else {
          return onSuccess(rows);
        }
      });
    }
  }, {
    key: 'executeUnprepared',
    value: function executeUnprepared(onSuccess, onError) {
      var _this2 = this;

      console.log(mysql.format(this.statement, this.values));
      _db2.default.connection.query(this.statement, this.values, function (error, rows) {
        if (error) {
          var sql = mysql.format(_this2.statement, _this2.values);
          console.error(error);
          console.trace('Query failed: ' + sql);
          return onError(error);
        } else {
          return onSuccess(rows);
        }
      });
    }
  }]);

  return Query;
}();

exports.default = Query;