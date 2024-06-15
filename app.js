const express = require('express');

const app = express();
const port = 3005;

app.disable('etag');
app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('./public'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/'));

// Templating Engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
const routers = require('./src/routes');


app.use('/', routers);


app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts('html')) {

        res.render('404', {
            url: req.url,
        });
        return;
    }
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
    res.type('txt').send('Not found');
});

app.listen(port, () => console.log(`Listening on port ${port}`))