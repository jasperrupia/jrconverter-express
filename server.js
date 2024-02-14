global.express = require('express')
global.router = express.Router();
global.app = express()
app.use('/static', express.static('public'))
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
require('dotenv').config();
var pagesPath = 'pages/';
// const expressLayoutEjs = require('express-ejs-layouts')

// app.use(expressLayoutEjs);

require('./index');

app.get('*:url', function(req, res){
    var err = new Error("URL Mismatch");
    next(err);
});

app.use(function(err, req, res, next) {
    const urlValue = req.originalUrl;
    res.status(404);
    res.render(pagesPath + 'errors/404', { url: urlValue });
});

var datetime = new Date();

app.listen(process.env.PORT || 3001, () => {
  console.log(`${datetime} App listening on port http://localhost:${process.env.PORT}`)
})

module.exports = app;

