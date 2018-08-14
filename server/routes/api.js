const express = require('express'),
  router = express.Router(),
  sql = require('../module/mysql');

router.get('/userData', (req,res)=>{
  let sqlstr = 'select * from usertb';
  sql(sqlstr,[],(err,data)=>{
    if(err) throw err;
    if(data && data.length>0){
      res.send({
        isOk:true,
        result:data
      })
    }else{
      res.send({
        isOk:false
      })
    }
  })
})

router.post('/user', (req,res)=>{
  let sqlstr = 'select * from usertb where id = ?';
  let value = [req.body.userId];
  sql(sqlstr,value,(err,data)=>{
    if(err) throw err;
    if(data && data.length>0){
      res.send({
        isOk:true,
        result:data
      })
    } else {
      res.send({
        isOk:false
      })
    }
  })
})

router.get('/classify', (req,res) =>{
  sql('select * from classify_tb',[],(err,data) => {
    if(err) throw err;
    if(data && data.length>0){
      res.send({
        isOk: true,
        result: data
      })
    }else {
      res.send({
        isOk:false
      })
    }
  })
});

router.post('/classify', (req,res) => {
  let sqlstr = '';
  let data = req.body.data;
  let value = [];
  switch (req.body.type){
    case 'update':
      sqlstr = 'update classify_tb set name = ?, level = ?,idx = ?, preid = ? where id = ?';
      value = [data.name,data.level,data.idx,data.preid,data.id];
      break;
    case 'delete':
      sqlstr = 'delete from classify_tb where id = ?';
      value = [data.id];
      break;
    case 'insert':
      sqlstr = 'insert into classify_tb (id, name, level ,idx ,preid) values (0,?,?,?,?)';
      value = [data.name,data.level,data.idx,data.preid];
      break;
    default:
      break;
  }
  sql(sqlstr,value,(err,data)=>{
    if(err){
      res.send({
        isOk:false
      });
    }else{
      res.send({
        isOk:true,
        result: data
      });
    }
  })
});

router.get('/status', (req,res) =>{
  sql('select * from status_tb',[],(err,data) => {
    if(err) throw err;
    if(data && data.length>0){
      res.send({
        isOk: true,
        result: data
      })
    }else {
      res.send({
        isOk:false
      })
    }
  })
});

router.get('/labels', (req,res) =>{
  sql('select * from label_tb',[],(err,data) => {
    if(err) throw err;
    if(data && data.length>0){
      res.send({
        isOk: true,
        result: data
      })
    }else {
      res.send({
        isOk:false
      })
    }
  })
});

router.post('/labels',(req,res)=>{
  let sqlstr = '',
    value = [];
  switch (req.body.type){
    case 'insert':
      sqlstr = 'insert into label_tb (id, name) values (0,?)';
      value = [req.body.name];
      break;
    case 'update':
      sqlstr = 'update label_tb set name = ? where id = ?';
      value: req.body.data;
      break;
    case 'delete':
      sqlstr = 'delete from label_tb where id = ?';
      value = [req.body.data.id];
      break;
    default:
      break;
  }
  sql(sqlstr,value,(err,data)=>{
    if(err){
      res.send({
        isOk:false
      })
    }else{
      res.send({
        isOk:true,
        result:data
      })
    }
  })
});

router.get('/article',(req,res) =>{
  let sqlstr = 'select * from article_tb';
  let value = [];
  switch (req.params.type){
    case 'all':
      sqlstr += 'order by id desc';
      break;
    case 'id':
      sqlstr += 'where id = '+ req.params.id;
      break;
    case 'regtime':
      sqlstr += 'order by regtime desc';
      break;
    case 'readcount':
      sqlstr += 'order by rendcount desc';
      break;
    case 'favorite':
      sqlstr += 'order by favorite desc';
      break;
    default:
      if(req.params.preid){
        sqlstr += 'where classify_first_id = ?';
        value = [req.params.preid]
        if(req.params.sedid){
          sqlstr += ' and classify_second_id = ?';
          value.push(req.params.sedid)
        }
      }
      break;
  }
  if(req.body.start){
    sqlstr += `limit ${req.body.start},${req.body.count}`;
  }
  sql(sqlstr,value,(err,data) => {
    if(err) throw err;
    if(data && data.length>0){
      res.send({
        isOk:true,
        result:data
      })
    }else{
      res.send({
        isOk:false
      })
    }
  })
});

router.post('/articleEdit',(req,res)=>{
  let sqlstr = '',
    datetime = new Date().toLocaleString(),
    data = req.body.data,
    value = [];
  switch(req.body.type){
    case 'update':
      sqlstr = `update article_tb set classify_first_id = ?,title= ?,label_id= ?,
      imgurl= ?,content= ?,contentTxt= ?,updatetime= ?,url= ?,status_id = ? where id=?`;
      value = [data.classify_first_id, data.title, data.label_id,data.imgurl,
        data.content,data.contentTxt, datetime, data.url,data.status_id, data.id];
      break;
    case 'insert':
      sqlstr = `INSERT INTO article_tb ( id, classify_first_id, classify_second_id, title,
       label_id,imgurl, content, contentTxt, author_id, author_nkname, regtime, updatetime, readcount, 
       favorite, url, status_id) VALUES (1,?,?,?,?,?,?,?,?,?,?,0,0,?,?)`;
      value = [data.classify_first_id,data.classify_second_id,data.title,data.label_id,data.imgurl,
        data.content,data.author_id,data.author_nkname,datetime,datetime,data.url,data.status_id];
      break;
    case 'delete':
      sqlstr = 'delete from article_tb where id = ?';
      value = [data.id];
      break;
    default:
      break;
  }
  sql(sqlstr,value,(err)=>{
    if(err){
      res.send({
        isOk: false
      })
    }else{
      res.send({
        isOk: true,
        result:data
      })
    }

  })
});

router.post('/comment',(req,res)=>{
  let sqlstr = '';
  let value = [];
  let type = req.body.type;
  switch (type){
    case 'count':
      sqlstr = 'select count(*) from comment_tb where art_id = ? and pre_com_id = 0';
      value = [req.body.id];
      break;
    case 'art':
      sqlstr = 'select * from  comment_tb where art_id = ?';
      value = [req.body.artId];
      break;
    case 'insert':
      sqlstr = `insert into comment_tb (id, content, art_id, author_id, author_nkname, time, com_id, pre_com_id) 
        values (0,?,?,?,?,?,?,?)`;
      let data = req.body.data;
      value = [data.content,data.artId,data.authorId,data.authorName,new Data().toLocaleString(),data.comId,data.preComId];
      break;
    default:
      break;
  }
  sql(sqlstr,value,(err,data)=>{
    if(err) throw err;
    if(data && (data.length>0 || type === 'insert' || type === 'count')){
      res.send({
        isOk: true,
        result: data
      })
    }else{
      res.send({
        isOk:false
      })
    }
  })
})

router.post('/collet', (req,res)=>{
  let sqlstr,value;
  switch (req.body.type){
    case 'insert':
      sqlstr = 'insert into collet_tb (id,user_id,art_id,time) values(0,?,?,?)';
      value = [req.body.data.userId,req.body.data.artId,new Date().toLocaleString()];
      break;
    case 'delete':
      sqlstr = 'delete from collet_tb where user_id = ? and art_id = ?';
      value = [req.body.data.userId,req.body.data.artId];
      break;
    case 'select':
      sqlstr = 'select from collet_tb where user_id = ? and art_id = ?';
      value = [req.body.data.userId,req.body.data.artId];
    default:
      break;
  }
  sql(sqlstr,value,(err,data)=>{
    console.log('err',err);
    console.log('data',data);
    if(err){
      res.send({
        isOk:false
      })
    }else{
      res.send({
        isOk:true,
        result:data
      })
    }
  })
})

router.use('/file',require('./file.js'))

module.exports = router;
