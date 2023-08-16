const { AddOrders, getOrders, incOrders, checkout } = require('../Controllers/orderContoller')

const router = require('express').Router()

router.post('/order',AddOrders)

router.post('/getorder',getOrders)

router.put('/order',incOrders)

router.put('/checkout',checkout)

// router.delete('/deleteall',deleteall)

module.exports = router
