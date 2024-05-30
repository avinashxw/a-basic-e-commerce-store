var express = require('express');
var router = express.Router();
let coupons    = [];

/* GET method */
router.get('/', function(req, res, next) {
  res.send('Welcome to Admin Dashboard!');
});


/* generate coupon code */
router.post('/generatecoupon', async function(req,res,next) {
    
    const newCouponCode = `COUPON${coupons.length+1}`;
    coupons.push(newCouponCode);

    try{
        res.json({message: 'Coupon code genereted: ', coupons: newCouponCode});
    } catch(error){
        console.log(error)
    }
});

module.exports = router;
