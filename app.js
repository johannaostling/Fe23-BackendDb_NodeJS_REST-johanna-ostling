//in dev run nodemon with for instant reload
//add requiered library 
//const express =  require('express'); //must be installed with npm
import express from "express";
//const ejs = require('ejs'); //must be installed with npm
import ejs from "ejs";
//const db = require('./db.js'); // Import the database module
import * as db from "./db.js"
//const bodyParser = require('body-parser');//must be installed with npm
import bodyParser from "body-parser";

//create variable representing express
const app = express();

//set public folder for static web pages
app.use(express.static('public'));

//set dynamic web pages, set views and engine
app.set('view engine', 'ejs');

// Set up body parser middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
// Use body-parser middleware to send JSON data
app.use(bodyParser.json());

////////////////Routing/////////////////

app.get('/', async (req, res) => {
    const pageTitle = "Dynamic webpage";
    const sql = 'SHOW tables';
    const dbData = await db.query(sql);
    console.log(dbData);
    res.render('index', {pageTitle, dbData} );
});


let currentTable;
app.post('/', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const tableName = req.body;
    const pageTitle = "Dynamic webpage";
    const sql = `SELECT * FROM ${tableName.table_name}`;
    currentTable = tableName.table_name
    const dbData = await db.query(sql);
    console.log(dbData);
    res.render('index', {pageTitle, dbData} );
});



///////////////////////// Students CRUD ///////////////////////////////////////////////////////////////////
app.get('/students', async (req, res) => {
    const pageTitle = "Dynamic webpage";
    const sql = `SELECT * FROM students`;
    const dbData = await db.query(sql);
    res.render('students', {pageTitle, dbData} );
    
});
app.post('/students', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body.id;
    const pageTitle = "Dynamic webpage";

    //execute delete query on a table.row
    const sqlDeleteQuery = `DELETE FROM students WHERE id=${requestData}`;
    const deleteQuery = await db.query(sqlDeleteQuery);

    //get table data
    const sql = `SELECT * FROM students`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('students', {pageTitle, dbData} );
});

app.post('/studentsAdd', async (req, res) => {
    //getting input data from the form
    const requestData = req.body;
    const pageTitle = "Dynamic webpage";
    const values = [requestData.fName, requestData.lName, requestData.town]
    //execute delete query on a table.row
    const sqlINSERTINTOQuery = `INSERT INTO students (fName, lName, town) VALUES (?,?,?)`;
    const INSERTINTOQuery = await db.query(sqlINSERTINTOQuery,values);

    //get table data
    const sql = `SELECT * FROM students`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('students', {pageTitle, dbData} );
});

app.post('/studentsUpdate', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body;
    const pageTitle = "Dynamic webpage";
    const values = [requestData.fName2,requestData.lName2, requestData.town2, requestData.id2]
    
    //execute delete query on a table.row
    console.log(values)
    const sqlINSERTINTOQuery = `UPDATE students SET fName=?, lName=?, town=? WHERE id=?`;
    const INSERTINTOQuery = await db.query(sqlINSERTINTOQuery,values);
    
    //get table data
    const sql = `SELECT * FROM students`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('students', {pageTitle, dbData} );
});

///////////////////////// courses CRUD ///////////////////////////////////////////////////////////////////
app.get('/courses', async (req, res) => {
    const pageTitle = "Dynamic webpage";
    const sql = `SELECT * FROM courses`;
    const dbData = await db.query(sql);
    res.render('courses', {pageTitle, dbData} );
});
app.post('/courses', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body.id;
    const pageTitle = "Dynamic webpage";

    //execute delete query on a table.row
    const sqlDeleteQuery = `DELETE FROM courses WHERE id=${requestData}`;
    const deleteQuery = await db.query(sqlDeleteQuery);

    //get table data
    const sql = `SELECT * FROM courses`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('courses', {pageTitle, dbData} );
});

app.post('/coursesAdd', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body;
    const pageTitle = "Dynamic webpage";
    const values = [requestData.name,requestData.description]
    //execute delete query on a table.row
    const sqlINSERTINTOQuery = `INSERT INTO courses (name, description) VALUES (?,?)`;
    const INSERTINTOQuery = await db.query(sqlINSERTINTOQuery,values);

    //get table data
    const sql = `SELECT * FROM courses`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('courses', {pageTitle, dbData} );
});

app.post('/coursesUpdate', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body;
    const pageTitle = "Dynamic webpage";
    const values = [requestData.name2,requestData.description2, requestData.id3]
    //execute delete query on a table.row
    console.log(values)
    const sqlINSERTINTOQuery = `UPDATE courses SET name=?, description=? WHERE id=?`;
    const INSERTINTOQuery = await db.query(sqlINSERTINTOQuery,values);
    // UPDATE användare SET ålder = 31 WHERE namn = 'Anna';
    
    //get table data
    const sql = `SELECT * FROM courses`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('courses', {pageTitle, dbData} );
});

///////////////////////// students_courses CRUD //////////////////////////////////////////////////////////
app.get('/students_courses', async (req, res) => {
    const pageTitle = "Dynamic webpage";
    const sql = `SELECT * FROM students_courses`;
    const dbData = await db.query(sql);
    res.render('students_courses', {pageTitle, dbData} );
});

app.post('/students_courses', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body.id;
    const pageTitle = "Dynamic webpage";

    //execute delete query on a table.row
    const sqlDeleteQuery = `DELETE FROM students_courses WHERE id=${requestData}`;
    const deleteQuery = await db.query(sqlDeleteQuery);

    //get table data
    const sql = `SELECT * FROM students_courses`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('students_courses', {pageTitle, dbData} );
});

app.post('/students_coursesAdd', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body;
    const pageTitle = "Dynamic webpage";
    const values = [requestData.id2,requestData.student_id,requestData.course_id]
    //execute delete query on a table.row
    const sqlINSERTINTOQuery = `INSERT INTO students_courses (id, student_id, course_id) VALUES (?,?,?)`;
    const INSERTINTOQuery = await db.query(sqlINSERTINTOQuery,values);

    //get table data
    const sql = `SELECT * FROM students_courses`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('students_courses', {pageTitle, dbData} );
});

app.post('/students_coursesUpdate', async (req, res) => {
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body;
    const pageTitle = "Dynamic webpage";
    const values = [requestData.student_id2,requestData.course_id2, requestData.id2]
    
    //execute delete query on a table.row
    console.log(values)
    const sqlINSERTINTOQuery = `UPDATE students_courses SET fName=?, lName=?, town=? WHERE id=?`;
    const INSERTINTOQuery = await db.query(sqlINSERTINTOQuery,values);
    
    //get table data
    const sql = `SELECT * FROM students_courses`;
    const dbData = await db.query(sql);

    //show webpage to the user
    res.render('students_courses', {pageTitle, dbData} );
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// return Json table data / Endpoints/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/courses/list', async (req, res) => {
    let sql = "";
    const {id} = req.query;
    console.log(id);
    if(id){
        sql = `SELECT * FROM courses WHERE id = ${id}`;
    }else{
        sql = `SELECT * FROM courses`;
    }
    const dbData = await db.query(sql);
    console.log(dbData);
    res.json(dbData);
});

app.get('/students/list', async (req, res) => {
    let sql = "";
    const {id} = req.query;
    console.log(id);
    if(id){
        sql = `SELECT * FROM students WHERE id = ${id}` ;
    }else{
        sql = `SELECT * FROM students`;
    }
    const dbData = await db.query(sql);
    console.log(dbData);
    res.json(dbData);
});


app.get('/students_courses/list', async (req, res) => {
    let sql = "";
    const {id} = req.query;
    console.log(id);
    if(id){
        sql = `SELECT * FROM students_courses WHERE id = ${id}`;
    }else{
        sql = `SELECT * FROM students_courses`;
    }
    const dbData = await db.query(sql);
    console.log(dbData);
    res.json(dbData);
});


app.get('/students_courses/fName/:fname', async (req, res) => {
        let sql = `SELECT students.fName, courses.name FROM students_courses INNER JOIN students ON students_courses.student_id = students.id INNER JOIN courses ON students_courses.course_id = courses.id WHERE students.fName="${req.params.fname}"`
        const dbData = await db.query(sql);
        res.json(dbData);
    });
app.get('/students_courses/id/:id', async (req, res) => {
        let sql = `SELECT students.id, courses.name FROM students_courses INNER JOIN students ON students_courses.student_id = students.id INNER JOIN courses ON students_courses.course_id = courses.id WHERE students.id=${req.params.id}` 
        const dbData = await db.query(sql);
        res.json(dbData);
    });

app.get('/students_courses/lName/:lName', async (req, res) => {
        let sql = `SELECT students.lName, courses.name FROM students_courses INNER JOIN students ON students_courses.student_id = students.id INNER JOIN courses ON students_courses.course_id = courses.id WHERE students.lName="${req.params.lName}"`
        const dbData = await db.query(sql);
        res.json(dbData);
    });

app.get('/students_courses/town/:town', async (req, res) => {
           let sql =`SELECT students.town, students.fName, courses.name FROM students_courses INNER JOIN students ON students_courses.student_id = students.id INNER JOIN courses ON students_courses.course_id = courses.id WHERE students.town = "${req.params.town}"`
        const dbData = await db.query(sql);
        res.json(dbData);
    });

app.get('/students_courses/courseId/:courseIdid', async (req, res) => {
        let sql = `SELECT students_courses.course_id, students.fName FROM students_courses INNER JOIN students ON students_courses.student_id = students.id WHERE students_courses.course_id=${req.params.courseIdid}` 
        const dbData = await db.query(sql);
        res.json(dbData);
    });

app.get('/students_courses/courseName/:courseName', async (req, res) => {
        let sql = `SELECT  courses.name, students.fName, students.lName FROM students_courses INNER JOIN students ON students_courses.student_id = students.id INNER JOIN courses ON students_courses.course_id = courses.id WHERE courses.name="${req.params.courseName}"`
        const dbData = await db.query(sql);
        res.json(dbData);
    });

app.get('/courses/courseWord/:courseWord', async (req, res) => {
        let sql = `SELECT  * FROM courses WHERE courses.name LIKE "%${req.params.courseWord}%"`
        const dbData = await db.query(sql);
        res.json(dbData);
    });
app.get('/courses/courseDescription/:courseDescriptionWord', async (req, res) => {
        let sql = `SELECT * FROM courses WHERE courses.description LIKE "%${req.params.courseDescriptionWord}%"`
        const dbData = await db.query(sql);
        res.json(dbData);
    });

//server configuration
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}/`);
});