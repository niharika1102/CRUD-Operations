const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
// uuid();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static('assets'));

let comments = [
    {   
        id: uuid(),
        username: 'Lily',
        comment: 'I have a flower by my name!!'
    },

    {
        id: uuid(),
        username: 'Tad',
        comment: 'Good morning folks!!'
    },

    {
        id: uuid(),
        username: 'Ursela',
        comment: 'Where is Pheobe?'
    },

    {
        id: uuid(),
        username: 'Jill',
        comment: 'Where is Jack!?'
    },

    {
        id: uuid(),
        username: 'Harry',
        comment: 'I do magic!!'
    },
]

//GET for index of all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})
  
//Add new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
  
//Add new comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})
  
//Show one comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

//Edit a comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})
  
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect('/comments');
})


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})