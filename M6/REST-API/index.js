/*
npm init -y
npm install express
*/
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('<h1>REST API Example<h1>');
});

// CRUD operations (Create, Read, Update, Delete) 
// Create course
app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.length < 3) {
        // 400 bad request
        return res.status(400).send('Name is required and length < 3');
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// Read all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Read single courses
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found!');
    res.send(course);
});

// Update a course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found!');

    if(!req.body.name || req.body.length < 3) {
        // 400 bad request
        return res.status(400).send('Name is required and length < 3');
    }

    course.name = req.body.name;
    res.send(course);
});


// Delete a course
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found!');

    courses.splice(courses.indexOf(course), 1);
    res.send(course);
});

app.listen(port, () => console.log('Server is listening...'));
