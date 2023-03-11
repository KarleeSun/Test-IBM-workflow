// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   port:"3306",
//   database: "vetDB"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

app.use(api, router);

app.all("*", (req, res, next) => {
 next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
 console.log(`server running on port ${PORT}`);
});

module.exports = app;

const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "127.0.0.1",
 user: "root",
 password: "",
 database: "vetDB",
});

conn.connect();

module.exports = conn;