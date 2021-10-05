const jwt = require('express-jwt');
const dotenv = require('dotenv')

dotenv.config()

const getTokenFromHeaders = (req) => {
  console.log(req)
  // const { headers: { authorization } } = req;

  let authorization = req.headers.authorization
  console.log(authorization)
  if(authorization){   //} && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

// const auth = {
//   required: jwt({
//     secret: process.env.JWTKEY,
//     userProperty: 'payload',
//     getToken: getTokenFromHeaders,
//     algorithms: ['HS256']           //gives error if RS256 or PS256 is used
//   }),
//   optional: jwt({
//     secret: process.env.JWTKEY,
//     userProperty: 'payload',
//     getToken: getTokenFromHeaders,
//     credentialsRequired: false,
//     algorithms: ['HS256']      
//   }),
// };

const authadmin = {
  required: jwt({
    secret: process.env.JWTKEY_ADMIN,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256']           
  }),
  optional: jwt({
    secret: process.env.JWTKEY_ADMIN,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256']      
  }),
};

const authuser = {
  required: jwt({
    secret: process.env.JWTKEY_USER,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256']           
  }),
  optional: jwt({
    secret: process.env.JWTKEY_USER,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256']      
  }),
};

// module.exports = auth;
module.exports.authadmin = authadmin;
module.exports.authuser = authuser;