const router = require('express-promise-router')();
const controller = require('../controllers/controller');

router.get('/send/:message', controller.send);

module.exports = router;
