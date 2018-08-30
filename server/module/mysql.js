const mysql = require('mysql');

module.exports = function (sqlstr,value,callback) {
  const config ={
      host: 'localhost',
      user: 'lolowu',
      password: '',
      part: '3306',
      database: 'blog',
      insecureAuth: true
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
  try{
    connect();
    db.query(sqlstr,value,callback);
  }catch (err) {
    console.log(err);
  }
  db.end();
}
