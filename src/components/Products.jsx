import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../redux/Action'
import { authentication } from '../App'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../redux/firebase'
import { useNavigate } from 'react-router'
import '../assets/product.css'


const Products = () => {
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart)
  const { logedUser, setLogedUser } = useContext(authentication)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAdd = async (id) => {
    if (logedUser) {
      const UserCart = (await getDoc(doc(db, `UserCart/${logedUser.uid}`))).data()

      const check = UserCart.cart.some(e => {
        if (e.id === products[id].id) {
          e.qty += 1;
          return true
        }
      })
      if (!check) {
        UserCart.cart.push({ ...products[id], qty: 1 })
      }
      await setDoc(doc(db, "UserCart", logedUser.uid), UserCart);
      dispatch(add(id));
    } else {
      navigate('/login')
    }
  }
  return (
    <>
      <h1 className="heading">Gaming Mouse</h1>
      <br />
      <div className="container d-flex justify-content-around">
        {products && products.map((item, id) => {
          return (
            <div className="card" key={id}>
              <div className="imgBox">
                <img src={item.image} alt="mouse corsair" className="mouse" />
              </div>

              <div className="contentBox">
                <h3>{item.title}</h3>
                <h2 className="price">₹{item.price}</h2>
                <button href="#" className="buy" onClick={() => handleAdd(id)}>Buy Now</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Products