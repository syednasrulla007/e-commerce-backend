const { postData, getData } = require('../Controllers/productController')

const router = require('express').Router()

router.post('/product',postData)

router.post('/getproduct',getData)

module.exports = router