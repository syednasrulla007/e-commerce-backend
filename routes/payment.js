const router = require('express').Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')

router.post('/payment',async(req,res)=>{
    try{
        // console.log(req.body)
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret:process.env.KEY_SECRET,
          });
        //   console.log(instance)
        const options = {
            amount:req.body.amount*100,
            currency:'INR',
            receipt:crypto.randomBytes(10).toString('hex'),
        }
        // console.log(options)
        instance.orders.create(options,(err,order)=>{
            if(err){
                console.log('err')
            }
            else{
                res.send({'data':order})
            }
        })
    }
    catch(err){
        console.log(err)
    }
})

router.post('/verify',async(req,res)=>{
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        }=req.body
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router