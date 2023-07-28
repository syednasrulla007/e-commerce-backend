const { Authunticate } = require('../Controllers/authController')

const router = require('express').Router()

router.post('/auth',Authunticate)

module.exports = router