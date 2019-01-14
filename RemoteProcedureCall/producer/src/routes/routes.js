const router = require('express-promise-router')();
const controller = require('../controllers/controller');

router.get('/fib/:value', controller.send);

module.exports = router;
