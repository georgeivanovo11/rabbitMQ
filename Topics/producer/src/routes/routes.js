const router = require('express-promise-router')();
const controller = require('../controllers/controller');

router.get('/send/:key', controller.send);

module.exports = router;
