import db from './db';

export default class Query {
  
  constructor(statement, values) {
    this.statement = statement;
    this.values    = values || [];
  }
  
  whereIn(column, values) {
    this.statement += ' AND ' + column + ' IN (?)';
    this.values.push(values);
  }
  
  whereNotIn(column, values) {
    this.statement += ' AND ' + column + ' NOT IN (?)';
    this.values.push(values);
  }

  whereLike(column, searchQuery) {
    this.statement += " AND " + column + " LIKE CONCAT('%', ?, '%')";
    this.values.push(searchQuery);
  }

  orderBy(columns) {
    this.statement += ' ORDER BY ' + columns;
  }

  limitOffset(limit, offset) {
    if (!this.values)
      this.values = [];

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

  execute(onSuccess, onError) {
    db.connection.execute(this.statement, this.values, (error, rows) => {
      if (error) {
        var sql = mysql.format(this.statement, this.values);
        console.error(error);
        console.trace('Query failed: ' + sql);
        return onError(error);
      } else {
        return onSuccess(rows);
      }
    });
  }

  executeUnprepared(onSuccess, onError) {
    console.log(mysql.format(this.statement, this.values));
    db.connection.query(this.statement, this.values, (error, rows) => {
      if (error) {
        var sql = mysql.format(this.statement, this.values);
        console.error(error);
        console.trace('Query failed: ' + sql);
        return onError(error);
      } else {
        return onSuccess(rows);
      }
    });
  }
  
}