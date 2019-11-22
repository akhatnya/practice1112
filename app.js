const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const { Pool } = require('pg');

const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kek',
    password: 'postgres',
    port: 5432
});

app.get("/getSomeData", 
    (request, response) => {
        connection.query("select * from todos", 
            (err, res) => {
                if (err) {
                    response.json({ message: "error" });
                } else {
                    response.json(res.rows);
                }
            });
    });

app.get("/delete/:id", (request, response) => {

    connection.query(
        "delete from todos where id = $1",
        [ request.params.id ],
        (err, res) => {
            if (err) {
                response.json(err);
            } else {
                response.json({ message: "successfully deleted" });
            }
        }
    );

});

app.get("/create/:description", (request, response) => {

    connection.query(
        "insert into todos(desciption) values($1)",
        [
            request.params.description
        ],
        (err, res) => {
            if (err) {
                response.json(err);
            } else {
                response.json({ message: "successfully created" });
            }
        }
    );

});
    
app.listen(8080,
    () => { 
        console.log("successfully running"); 
    });