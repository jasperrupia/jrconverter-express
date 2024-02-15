var pagesPath = 'pages/admin/';

router.get('/dashboard', checkAuthentication, function(req, res){
    res.render(pagesPath + 'dashboard', { title: 'Admin panel' });
});

router.get('/others', checkAuthentication, function(req, res){
    res.render(pagesPath + 'others', { title: 'Admin panel' });
});

router.get('/nextother', checkAuthentication, function(req, res){
    res.render(pagesPath + 'next_other', { title: 'Admin panel' });
});

module.exports = router;