const { authorization } = require('../controller/auth.controller')
const {  shape, getAllCal } = require('../controller/shape.controller')
// const { authorization } = require('../controller/auth.controller');
// const { shape } = require('../controller/shape.controller');

const router = require('express').Router();

router.use(authorization);
// router.post('/shapecal', shape);

router.post('/shapecal', authorization, shape)

router.get('/allshapes', authorization, getAllCal)

module.exports = router
// module.exports = router;
