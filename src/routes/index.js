const router = require("express").Router();

router.use(require("./auth"));
router.use(require('./project'))
router.use(require('./template'))

module.exports = router;
