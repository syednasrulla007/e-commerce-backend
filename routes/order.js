const { AddOrders, getOrders, incOrders, checkout,deleteall } = require('../Controllers/orderContoller')

const router = require('express').Router()

router.post('/order',AddOrders)

router.post('/getorder',getOrders)

router.put('/order',incOrders)

router.put('/checkout',checkout)

router.put('/deleteall',deleteall)

module.exports = router
