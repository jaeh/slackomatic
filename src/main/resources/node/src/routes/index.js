import {Router as r} from 'express';
var router = r();

function renderPage(req, res, next, locals = {}) {
  res.render(req.params.page, locals, (err, html) => {
    if ( err || ! html ) { return next(err); }
    res.status(200).send(html);
  });
}

/* GET home page. */
router.get('/', (req, res, next) => {
  var locals = {
    title: 'slackomatic'
  };
  req.params.page = 'pages/index';
  renderPage(req, res, next, locals);
});

router.get('/:page', (req, res, next) => {
  var locals = {
    title: 'slackomatic - ' + req.params.page
  };
  req.params.page = 'pages/' + req.params.page;
  renderPage(req, res, next, locals);
});


export default router;
