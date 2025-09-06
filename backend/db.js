const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Hansika@1978',
  database: process.env.DB_NAME || 'book_explorer'
});

conn.connect(err => {
  if(err) console.error("DB Connection Error: ", err);
  else console.log("DB Connected");
});

module.exports = conn;
