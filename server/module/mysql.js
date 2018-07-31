const mysql = require('mysql');

module.exports = function (sqlstr,value,callback) {
  const config ={
      host: 'localhost',
      user: 'root',
      password: '',
      part: '3306',
      database: 'node'
  };
  let db;
  function handleError (err) {
      if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
          connect();
        }else{
          console.error(err.stack|| err);
        }
      }
  }
  function connect(){
      db =  mysql.createConnection(config);
      db.connect(handleError);
      db.on('error',handleError)
  }
  connect();
  db.query(sqlstr,value,callback);
  db.end();
}
