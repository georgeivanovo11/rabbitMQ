const router = require('express-promise-router')();
const controller = require('../controllers/controller');

router.get('/send', controller.send);

module.exports = router;
