var server = require('./server');

server.get('/', (req, res) => {
  res.send('<h1>Home Text!</h1>')
})

// server.get('/index', function(req, res){
//     res.render('index');
// });

server.get('/index', function(req, res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

