const { removeAllListeners } = require("nodemon");

const allowedOrigins = [
  "https://www.google.com",
  "http://localhost:5173",
  "http://127.0.0.1:8080",
  "postman",
  "https://book-store-theta-black.vercel.app",
  "https://book-store-i1z1cu8t3-tiloksgit.vercel.app",
  "http://192.168.205.246:3000",
];

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) != -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by cors`));
      }
    },
    optionsSuccessStatus: 200,
    Credentials: true,
  };
  
  module.exports = corsOptions;