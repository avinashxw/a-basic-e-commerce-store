import React, { useState } from 'react';
import axios from 'axios';

const App = () => {

    const [userid, setUserid]         = useState('');
    const [item, setItem]             = useState({itemid:'',qty:0,price:0});
    const [couponCode, setCouponCode] = useState('');

    const addItem = async() => {
      try{
        await axios.post('http://localhost:3001/cart/add/', {
          userid, item
        });
        alert('Success! An item added.');
      } catch(error) {
        console.log('The item cannot be added to the cart!', error);
      }
    }; 

    const checkout = async() => {
      try{
        await axios.post('http://localhost:3001/cart/checkout/', {
          userid,
          couponCode
        });
        alert('Success! An order placed.');
      }catch(error) {
        console.log('The order cannot be placed!', error);
      }
    };

    const handleInputChange = (event) => {
      setUserid(event.target.value);
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
            <input type='text' placeholder='Coupon' value={couponCode} onChange={(e) => setCouponCode} required />
            <button style={ {backgroundColor: "#0e0e0e", color: "#ffffff", padding: "2px 30px", textAlign: "center", display: "inline-block", fontSize: "16px"} } onClick={checkout}>
              Proceed to checkout!
            </button>
          </div>
        </div>
      </>
    );
};

export default App;
