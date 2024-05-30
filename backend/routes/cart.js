var express = require('express');
var router = express.Router();

/* GET method */
router.get('/', function(req, res, next) {
  res.send('You are accessing cart now!');
});

/* define veriables to be used for cart & checkout */
let cartItems  = [];
let orders     = [];
let orderItems = [];
let coupons    = [];

/* add an item to the cart */
router.post('/add', function(req,res,next) {
    
    const { userid, item } = req.body;

    try{
        let cart = cartItems.find(c=>c.userid === userid);
        if(!cart) {
            cart = { userid, items:[] };
            cartItems.push(cart);
        }

        cart.items.push(item);
        res.json({message: 'Item has been added to the cart!'});
        res.end();
    } catch(error){
        console.log(error)
    }
});

/* place order */
router.post('/checkout', function(req,res,next) {
    
    const { userid, couponCode } = req.body;

    try{
        let cart = cartItems.find(c=>c.userid === userid);
        console.log(cart);
        if(!cart || cart.items.length===0) {
            return res.json({message: 'The cart is empty!'});
            res.end();
        }
        else {
            let totalAmount = cart.items.reduce((total,item) => total + item.qty * item.price, 0);
            let grandTotal = totalAmount;

            if(couponCode && coupons.includes(couponCode)) {
                grandTotal *=0.9;
            }

            orders =+ 1;

            if(orders % 10 === 0) {
                const newCouponCode = `COUPON${coupons.length+1}`;
                coupons.push(newCouponCode);
            }

            orderItems.push({
                userid,
                items: cart.items,
                totalAmount,
                couponCode,
                grandTotal
            });

            cart = cartItems.filter(c=>c.userid!==userid);

            res.json({message: 'Order placed successfully!', order: orderItems[orderItems.length-1]});
        }
        
    } catch(error){
        console.log(error)
    }
});

module.exports = router;
