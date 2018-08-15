const BASEURL = ' https://www.easy-mock.com/mock/5b71578f870492755436c111/api/';
const LOCALURL = 'http://localhost:3001/';
const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login'
};

module.exports = URL;
