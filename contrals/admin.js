var pagesPath = 'pages/admin/';

router.get('/dashboard', function(req, res){
    res.render(pagesPath + 'dashboard', { title: 'Admin panel' });
});

router.get('/others', function(req, res){
    res.render(pagesPath + 'others', { title: 'Admin panel' });
});

router.get('/nextother', function(req, res){
    res.render(pagesPath + 'next_other', { title: 'Admin panel' });
});

module.exports = router;