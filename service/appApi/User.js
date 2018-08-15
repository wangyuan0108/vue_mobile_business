const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();
router.get('/', async ctx => {
  ctx.body = '这是用户操作首页';
});
router.post('/register', async ctx => {
  const User = mongoose.model('User');
  var newUser = new User(ctx.request.body);
  console.log('e', newUser);
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      };
    })
    .catch(error => {
      ctx.body = {
        code: 500,
        message: error
      };
    });
});
module.exports = router;
