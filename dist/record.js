"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Record = function () {
  function Record(record) {
    _classCallCheck(this, Record);

    for (var field in record) {
      this[field] = record[field];
    }
  }

  _createClass(Record, [{
    key: "equalsOrNull",
    value: function equalsOrNull(fields, value) {
      if (fields.constructor !== Object) {
        var field = fields;
        fields = {};
        fields[field] = value;
      }

      for (var _field in fields) {
        if (this[_field] == null) return true;else {
          var equals = this[_field] === fields[_field];
          return equals;
        }
      }
    }
  }, {
    key: "checkOrFill",
    value: function checkOrFill(fields, value) {
      if (fields.constructor !== Object) {
        var field = fields;
        fields = {};
        fields[field] = value;
      }

      for (var _field2 in fields) {
        if (this[_field2] == null) {
          this[_field2] = fields[_field2];
          return true;
        } else if (this[_field2] === fields[_field2]) return true;else return false;
      }
    }
  }, {
    key: "deleteIfNull",
    value: function deleteIfNull(fields) {
      if (fields.constructor !== Array) fields = [fields];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;

          if (this[field] == null) delete this[field];else return false;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }]);

  return Record;
}();

exports.default = Record;


exports.Record = Record;