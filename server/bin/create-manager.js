'use strict';

const app = require('../server');

app.models.Manager.upsert({
  username: 'admin',
  email: 'admin@qq.com',
  password: '123456',
}).then((user)=> {
  console.log(user);
});
