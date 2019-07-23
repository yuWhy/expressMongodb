var express = require('express'); // 引入对象
var router = express.Router();
var mongoose = require('mongoose');
var TodoModel = mongoose.model('user'); // 映入模型  感觉就是db.js里面定义的字段
var URL = require('url'); // 映入URl中间件 获取req中的参数

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express56' });
});

router.post('/create', function(req, res) {
  console.log('req.body', req.body);
  new TodoModel({ // 实例化对象，新建数据
    content: req.body.content,
    updated_at: Date.now()
  }).save(function(err, todo, count) { // 保存数据
    console.log('内容', todo, '数量', count);// 打印保存的数据
    res.redirect('/');// 返回首页
  })
})

router.get('/search', function(req, res, next) {
  TodoModel.
      find().
      sort('updated_at').
      exec(function(err, aa, count) {
        res.send(aa);
  })
})

router.get('/destory', function(req, res) {
  var params = URL.parse(req.url, true).query;
  TodoModel.findById(params.id, function(err, todo) {
    todo.remove(function(err, todo) {
      res.redirect('/');
    })
  })
})

module.exports = router;
