const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/newdbapi.db');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.listen(8000,()=>{
    console.log('Server Started')
})

app.get('/', (req, res) => {
    res.json('work')
})

app.get('/info',(req, res) =>{
    db.all(`SELECT * FROM info`,(err, rows) =>{
        res.json(rows)
        
    })
})

app.post('/info',(req, res) =>{
    const employer = req.body
    const request = `INSERT INTO info VALUES (
        null,
        '${employer.first_name}',
        '${employer.last_name}',
        '${employer.email}',
        '${employer.phone_number}',
        '${employer.hire_date}',
        '${employer.job_id}',
        '${employer.salary}',
        '${employer.commission_pct}',
        '${employer.manager_id}',
        '${employer.departament_id}')`

    db.run(request,(err) =>{
        if (err) {
            res.json(err)
        }
        res.json('approved')
    })
})

app.put('/info/:id',(req, res) =>{
        db.all(`UPDATE first_name FROM info`,(err, rows) =>{
            res.json(rows)
        })
    res.json('updated')
})

app.delete('/info/:id',(req, res) =>{
    const {id} = req.params
    const request = `DELETE FROM info WHERE 
        id=${id}`  
        db.run(request, (err) => {
            if(err) {
                res.json(err)
            }
            res.json('removed')
        })
})
