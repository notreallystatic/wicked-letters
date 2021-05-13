require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  jwtSecret: 'ls2d3ci0ljks39cd.fDoId03ck10',
  db: {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
  },
};
