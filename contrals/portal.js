var pagesPath = 'pages/portal/';

router.get('/', function(req, res){
    res.render(pagesPath + 'index', { title: 'Jr Converter' });
});

router.get('/terms', function(req, res){
    res.render(pagesPath + 'terms', { title: 'Jr Converter' });
});

router.get('/privacy', function(req, res){
    res.render(pagesPath + 'privacy', { title: 'Jr Converter' });
});

module.exports = router;