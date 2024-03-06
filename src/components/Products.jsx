import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../assets/product.css'
// import img1 from '../assets/Images/nike-shoes.png'
import { add, getCart } from '../redux/Action'
import { authentication } from '../App'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../redux/firebase'


const Products = () => {
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart)
  const { logedUser, setLogedUser } = useContext(authentication)
  const dispatch = useDispatch()
  // console.log(logedUser);
  const handleAdd = async (id) => {
    // console.log(products[id]);
    // console.log(id)
    // if (logedUser) {
    // const currentUser = await axios.get(`http://localhost:3001/LoggedIn`).then((resp) => resp.data)
    // let cart1 = [...products]
    // console.log(cart1)
    dispatch(add(id));

    await setDoc(doc(db, "UserCart", logedUser.uid  ), {

    });

    // check();

    // const check = currentUser.cart.some(e => {
    //   if (e.title === cart[id].title) {
    //     e.qty += 1;
    //     return true
    //   }
    // })
    // if (!check) {
    //   cart = [{ ...cart[id], qty: 1 }]
    //   currentUser.cart.push(...cart)
    // }

    // await axios.put(`http://localhost:3001/users/${logedUser.id}`, currentUser);
    // await axios.put(`http://localhost:3001/LoggedIn`, currentUser);
    // setLogedUser(currentUser)

    // } else {
    // navigate('/login')
    // }
  }
  const check = () => {
    console.log(cart, 'hii')
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