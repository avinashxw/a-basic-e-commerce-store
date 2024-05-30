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
    console.log(req.body);

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

/* add an item to the cart */
router.post('/checkout', function(req,res,next) {
    
    const { userid, coupon } = req.body;
    console.log(req.body);

    try{
        let cart = cartItems.find(c=>c.userid === userid);

        if(!cart || cart.items.length===0) {
            return res.json({message: 'The cart is empty!'});
            res.end();
        }

        
    } catch(error){
        console.log(error)
    }
});

module.exports = router;
