const express = require('express'),
  router = express.Router(),
  sql = require('../module/mysql'),
  crypto = require('crypto');

router.get('/username', function (req, res, next) {
  sql('select * from usertb where username = ?', [req.query.user], (err, data) => {
    if (data && data.length > 0) {
      res.send(false);
    } else {
      res.send(true);
    }
  })
});

router.get('/register', function (req, res, next) {
  let user = req.query.name,
    nickname = req.query.nickname,
    pass = req.query.password,
    md5 = crypto.createHash('md5');
  console.log(req.query);
  sql('select * from usertb where username = ?', [user], (err, data) => {
    if(data.length===0){
      let newpass = md5.update(pass).digest('hex');
      time = new Date().toLocaleString();
      sql('INSERT INTO `usertb` (`id`, `username`, `password`, `admin`, `photo`, `nickname`, `sex`, `regtime`, `activeness`) VALUES (NULL, ?, ?, 0, 0, ?, 0, ?, 0)',[user,newpass,nickname,time],(err,data)=>{
        console.log(err);
        if(err){
          res.send(false);
          return;
        }
        res.send(true);
      })
    }else{
      res.send(false);
    }
  })
})

module.exports = router;
