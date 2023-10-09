const mysql = require("mysql2");
const dbconfig = require("../config/db.config");
const connection = mysql.createConnection({
  port: dbconfig.PORT,
  user: dbconfig.USER,
  host: dbconfig.HOST,
  database: dbconfig.DATABASE,
  password: dbconfig.PASSWORD,
});

connection.connect(function(err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

module.exports = connection;