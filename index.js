var server = require('./server');

// server.get('/', (req, res) => {
//   res.send('<h1>Home Text!</h1>')
// })

server.get('/', function(req, res){
    res.render('index', { title: 'Jr Converter' });
});

// server.get('/index', function(req, res){
//     res.sendFile(path.join(__dirname+'/views/index.html'));
// });

