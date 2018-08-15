const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
let user = require('./appApi/user.js');
const app = new Koa();
const cors = require('koa2-cors');
const mongoose = require('mongoose');
const { connect, initSchemas } = require('./database/init.js');

let router = new Router();
router.use('/user', user.routes());
app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async ctx => {
  ctx.body = 'hello koa2';
});
(async () => {
  await connect();
  // initSchemas();
  // const User = mongoose.model('User');
  // let oneUser = new User({ userName: 'jspang', password: '123456' });
  // oneUser.save().then(() => {
  //   console.log('插入成功');
  // });
})();
app.listen(3001);
console.log('[demo] start-quick is starting at port 3000');
