const express = require('express')
const cookieSession = require('cookie-session')

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

const users = [
  {
    userId: 1,
    username: 'todddemone',
    location: 'Oakville'
  },
  {
    userId: 2,
    username: 'nicodann',
    location: 'Toronto'
  }
];

app.get('/', (req, res) => {
  res.send('welcome to try-cookie-session');
});

app.get('/login/:id', (req, res) => {
  req.session.userId = req.params.id;
  const user = users.find(user => user.userId === parseInt(req.params.id))
  req.session.username = user.username;
  req.session.location = user.location;
  res.send('You just set a cookie'); 
})

app.get('/getcookie', (req, res) => {
  console.log('userId:', req.session.userId);
  console.log('username:', req.session.username)
  console.log('location:', req.session.location)
  res.send(`Your userId is ${req.session.userId}, your username is ${req.session.username}, and your location is ${req.session.location}`)
})

app.get('/logout', (req, res) => {
  req.session = null;
  res.send('Your cookie has been deleted');
})

app.listen(8001, () => console.log('The server is running on port 8001...'))