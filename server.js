const express = require('express')
const app = express()
app.use('/static', express.static('public'))
app.set('view engine', 'ejs');
app.set('views','./views');
const path = require('path');
require('dotenv').config();


app.get('*:url', function(req, res){
    var err = new Error("URL Mismatch");
    next(err);
});

app.use(function(err, req, res, next) {
    const urlValue = req.originalUrl;
    res.status(404);
    res.render('errors/404', { url: urlValue });
});


app.listen(process.env.PORT || 3001, () => {
  console.log(`App listening on port http://localhost:${process.env.PORT}`)
})

module.exports = app;