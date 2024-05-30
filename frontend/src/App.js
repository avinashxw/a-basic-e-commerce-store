import React, { useState } from 'react';
import axios from 'axios';

const App = () => {

    const [userid, setUserid]         = useState('');
    const [item, setItem]             = useState({itemid:'',qty:0,price:0});
    const [couponCode, setCouponCode] = useState('');

    const handleInputChange = (event) => {
      setUserid(event.target.value);
    };
    const handleCouponChange = (event) => {
      setCouponCode(event.target.value);
    };

    const addItem = async() => {
      
        await axios.post('http://localhost:3001/cart/add/', {
          userid, item
        }).then((res) => {
          console.log(res.data);
          alert(`${res.data.message}`);
        })    
        .catch((err) => {});  
    }; 

    const checkout = async() => {
      
        await axios.post('http://localhost:3001/cart/checkout/', {
          userid,
          couponCode
        }).then((res) => {
          console.log(res.data.message);
          alert(`${res.data.message}`);
        })    
        .catch((err) => {});  
    }; 


    return (
      <>
        <div>
          <h1>Online E-Commerce Store</h1>
          <div>
            <input type='text' placeholder='User ID' value={userid} onChange={handleInputChange} required />
            <input type='text' placeholder='Item ID' value={item.itemid} onChange={(e) => setItem({...item, itemid: e.target.value})} required />
            <input type='text' placeholder='Quantity' value={item.qty} onChange={(e) => setItem({...item, qty: e.target.value})} required />
            <input type='text' placeholder='Price' value={item.price} onChange={(e) => setItem({...item, price: e.target.value})} required />
            <button style={ {backgroundColor: "#04AA6D", color: "#ffffff", padding: "2px 30px", textAlign: "center", display: "inline-block", fontSize: "16px"} } onClick={addItem}>
              Add to cart!
            </button>
            <hr/>
            <input type='text' placeholder='Coupon' value={couponCode} onChange={handleCouponChange} required />
            <button style={ {backgroundColor: "#0e0e0e", color: "#ffffff", padding: "2px 30px", textAlign: "center", display: "inline-block", fontSize: "16px"} } onClick={checkout}>
              Proceed to checkout!
            </button>
          </div>
        </div>
      </>
    );
};

export default App;
