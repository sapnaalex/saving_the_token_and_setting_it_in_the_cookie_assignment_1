require("dotenv").config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const encrypt = (payload) => {
  // encrypt the payload and return token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'});
  return token;

}

const decrypt = (token) => {
  // return decoded payload
  try{
    const decoded =  jwt.verify(token, JWT_SECRET);
    return decoded;
  }catch(err){
    console.log('Token verification failed: ', err.message);
    return null;
  }
}

module.exports = {
  encrypt,
  decrypt
};

const testPayload = { name: "Test" };
const token = encrypt(testPayload);
const result = decrypt(token);

if (result && result.name === "Test") {
  console.log("Success ✅");
} else {
  console.log("Failed ❌");
}
