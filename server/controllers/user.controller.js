class Routing {

  constructor(connection) {
    this.connection = connection;
  }
  getUsers = (req, res) => {
    if (res.status(200)) {
      this.connection.query('SELECT * FROM `users`', function (error, results, fields) {
        res.send({
          data: results,
        })
      })
    }
  }

  SendUsers = (req, res) => {
    console.log('simple', req.body);
    const {id,login, password} = req.body;
    this.connection.query(
      "INSERT INTO `users`(`id`, `login`, `passowrd`, `email`, `last`) " +
      `VALUES (${id},'${login}','${password}','---','---')`,
      (error, results, fields) => {
        console.log(error)
      res.sendStatus(200);
      }
    )
  }

  GetUser = (req, res) => {
    const name = req.params.id;
    console.log(name)
    this.connection.query('SELECT * FROM `users` ' + `WHERE login = ${name}`,
      (error, results, fields) => {
        console.log(results);
        res.send({
          data: results,
        })
      }
    );
  }

  ClearTable = (req, res) => {
    if (req.body.delete) {
      const query = 'DELETE FROM `users` WHERE 1'
      this.connection.query( query, (error, results, fields) => {
          if (error) {

          }
        }
      )
    }
    res.sendStatus(200);
  }
}



module.exports.Routing = Routing;