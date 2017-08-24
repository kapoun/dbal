import * as mysql from 'mysql2';

var db = {

  connection: null,

  init: function (config) {
    db.connection = mysql.createConnection(config);
  }

};

export default db;