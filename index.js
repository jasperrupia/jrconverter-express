var authRoutes = require('./contrals/auth');
var portalRoutes = require('./contrals/portal');
var adminRoutes = require('./contrals/admin');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', portalRoutes);
