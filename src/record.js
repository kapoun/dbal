export default class Record {
  
  constructor(record) {
    for (let field in record) {
      this[field] = record[field];
    }
  }
  
  equalsOrNull(fields, value) {
    if (fields.constructor !== Object) {
      var field = fields;
      fields = {};
      fields[field] = value;
    }
    
    for (let field in fields) {
      if (this[field] == null) 
        return true;
      else {
        var equals = (this[field] === fields[field]);
        return equals;
      }
    }
  }
  
  checkOrFill(fields, value) {
    if (fields.constructor !== Object) {
      var field = fields;
      fields = {};
      fields[field] = value;
    }
    
    for (let field in fields) {
      if (this[field] == null) {
        this[field] = fields[field];
        return true;
      } else if (this[field] === fields[field])
        return true;
      else
        return false;
    }
  }
  
  deleteIfNull(fields) {
    if (fields.constructor !== Array)
      fields = [fields];
    for (let field of fields) {
      if (this[field] == null)
        delete this[field];
      else
        return false;
    }
    return true;
  }
  
}

exports.Record = Record;