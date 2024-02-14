"use strict"

var session = require('express-session');
const store = session.MemoryStore();
const bcrypt = require('bcrypt');
var pagesPath = 'pages/auth/';
const fs = require("fs/promises"); 

let userData = [];
let userDataPath = "data/users.json";

async function readUserData() {
  try {
    const data = await fs.readFile(userDataPath, 'utf8');
    userData = JSON.parse(data);
  }
  catch (err) {
    console.error('Error reading user.json file:', err);
  }
} 

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(session({ 
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // if true -> create session cookie even on page load & save session if modified
  secret: 'sign session id cookies',
  cookie: {maxAge: 300000},
  store: store
}));

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});
 
router.post('/signup', async (req, res) => { 
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.username, pass: hashedPassword }
    userData.push(user)
    fs.writeFile(
      userDataPath,
      JSON.stringify(userData),
      err => {
          if (err) throw err;
      });
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied! You see!';
    res.redirect('/auth');
  }
}

router.get('/restricted', isAuthenticated, function(req, res){
  res.render(pagesPath + 'sign_in');
});

router.get('/signup', function(req, res){
  res.render(pagesPath + 'sign_up');
});

router.get('/signout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/auth');
  });
});

router.get('/', function(req, res){
  res.render(pagesPath + 'sign_in');
});

router.post('/', async function (req, res, next) {
  const {username, password} = req.body;
  readUserData();
  const user = userData.find(user => user.name === username)
  if (user == null) {
    req.session.error = 'User not found!!';
    res.redirect('/');
  }
  try {
    if(await bcrypt.compare(password, user.pass)) {
      req.session.regenerate(function(){
        req.session.authenticated = true;
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name;
        res.redirect('/admin/dashboard');
      });
    } else {
      req.session.error = 'Credentials mismatch!!';
      res.redirect('/');
    }
  } catch {
    res.status(500).send()
  }
});

module.exports = router;