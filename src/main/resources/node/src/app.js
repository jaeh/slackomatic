import express from 'express';
import {join} from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import stylus from 'stylus';
import routes from './routes';

var app = express()
  , cwd = process.cwd()
  , publicDir = join(cwd, 'public')
;

// view engine setup
app.set('views', join(cwd, 'views'));
app.set('view engine', 'jade');

app.use(favicon(join(publicDir, 'favicon.ico')));
app.use(logger('dev'));

app.use(stylus.middleware(publicDir));
app.use(express.static(publicDir));

app.use('*', routes);

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use( (err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

export default app;
