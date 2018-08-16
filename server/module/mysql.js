const mysql = require('mysql');

module.exports = function (sqlstr,value,callback) {
  const config ={
      host: 'qdm1300831.my3w.com',
      user: 'qdm1300831',
      password: 'dyrcjqlgcj',
      part: '3306',
      database: 'qdm1300831_db',
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
