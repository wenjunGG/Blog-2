const mysql = require('mysql');

module.exports = function (sqlstr,value,callback) {
  const config ={
      host: '47.93.243.252',
      user: 'lolowu',
      password: 'Lolowu.cn123',
      part: '3306',
      database: 'lolowu',
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
