import React, { useContext, useEffect, useState } from 'react'
import { authentication } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { decrementItem, deleteItem, incrementItem } from '../redux/Action'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../redux/firebase'
import Swal from 'sweetalert2'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const { logedUser, setLogedUser } = useContext(authentication)
  const [UserCart, setUserCart] = useState()

  const fetchUserCart = async () => {
    const userCartData = (await getDoc(doc(db, `UserCart/${logedUser.uid}`))).data();
    setUserCart(userCartData);
  };
  useEffect(() => {
    fetchUserCart();
  });

  const dispatch = useDispatch();
  let tq = 0;
  let tp = 0;
  cart.map(item => {
    tq += item.qty;
    tp += item.qty * item.price;
  });
  const decreaseQuantity = async (id) => {
    UserCart.cart[id].qty--
    if (UserCart.cart[id].qty === 0) { UserCart.cart.splice([id], 1) }
    dispatch(decrementItem(id));
    await setDoc(doc(db, "UserCart", logedUser.uid), UserCart);
  }
  const increaseQuantity = async (id) => {
    UserCart.cart[id].qty++
    dispatch(incrementItem(id));
    await setDoc(doc(db, "UserCart", logedUser.uid), UserCart);
  }
  const deleteAll = async () => {
    UserCart.cart = []
    dispatch(deleteItem());
    await setDoc(doc(db, "UserCart", logedUser.uid), UserCart);
  }
  const handleCheckOut = async () => {
    if (cart.length > 0) {
      Swal.fire({
        title: "Your food is on the way 😋",
        icon: "success",
        showConfirmButton: false,
        timer: 1700
      });
      UserCart.cart = []
      dispatch(deleteItem());
      await setDoc(doc(db, "UserCart", logedUser.uid), UserCart);
    } else {
      Swal.fire({
        title: "Try Adding Something to Cart. 😉",
        icon: "info",
        showConfirmButton: false,
        timer: 1700
      });
    }
  }
  return (
    <div>
      <table className="table mt-4 table-striped m-auto text-center">
        <thead>
          <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.image} width="50px" height="50px" alt="Item" />
              </td>
              <td>{item.title}</td>
              <td>₹ {item.price}</td>
              <td>
                <button
                  onClick={() => decreaseQuantity(index)}
                  className="border-0 bg-dark text-white"
                >
                  -
                </button>
                <input type="number" className="text-center w-25" name="quantity" value={item.qty} disabled />
                <button onClick={() => increaseQuantity(index)} className="border-0 bg-dark text-white">
                  +
                </button>
              </td>
              <td>₹ {item.qty * item.price}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>TOTAL</th>
            <th></th>
            <th></th>
            <th>{tq}</th>
            <th>₹ {tp}</th>
            <th>
              <button type="submit" onClick={deleteAll} className="border btn">
                Clear All
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-lg btn-success text-white my-3 mx-2 rounded-pill' onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  )
}

export default Cart