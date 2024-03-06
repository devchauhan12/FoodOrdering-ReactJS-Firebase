import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../assets/product.css'
// import img1 from '../assets/Images/nike-shoes.png'
import { add, getCart } from '../redux/Action'


const Products = () => {
  const products = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleAdd = async (id) => {
    // if (logedUser) {
      // const currentUser = await axios.get(`http://localhost:3001/LoggedIn`).then((resp) => resp.data)
      let cart1 = [...products]
      console.log(cart1)
      console.log(cart , 'hii')

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

      dispatch(add(id));
    // } else {
      // navigate('/login')
    // }
  }
  return (
    <>
      <h1 className="heading">Gaming Mouse</h1>
      <br />
      <div className="container d-flex justify-content-around">
        {/* <div class="card">
          <div class="imgBox">
            <img src="https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Gaming-Mice/CH-9306011-EU/Gallery/NIGHTSWORD_RGB_01.webp?width=1920&quality=85&auto=webp&format=pjpg" alt="mouse corsair" class="mouse" />
          </div>

          <div class="contentBox">
            <h3>Mouse Corsair M75</h3>
            <h2 class="price">₹ 6199</h2>
            <a href="#" class="buy">Buy Now</a>
          </div>
        </div>
        <div class="card">
          <div class="imgBox">
            <img src="https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Gaming-Mice/CH-931A011/DARKSTAR_WIRELESS_01.webp?width=1080&quality=85&auto=webp&format=pjpg" alt="mouse corsair" class="mouse" />
          </div>

          <div class="contentBox">
            <h3>Mouse Corsair M65</h3>
            <h2 class="price">₹7299</h2>
            <a href="#" class="buy">Buy Now</a>
          </div>
        </div>
        <div class="card">
          <div class="imgBox">
            <img src="https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Gaming-Mice/base-m65-rgb-ultra-wireless-2-config/Gallery/M65_RGB_ULTRA_WIRELESS_WHT_01.webp?width=1920&quality=85&auto=webp&format=pjpg" alt="mouse corsair" class="mouse" />
          </div>

          <div class="contentBox">
            <h3>Mouse Corsair M85</h3>
            <h2 class="price">₹11599</h2>
            <a href="#" class="buy">Buy Now</a>
          </div>
        </div> */}

        {products && products.map((item,id) => {
          return (<div class="card">
            <div class="imgBox">
              <img src={item.image} alt="mouse corsair" class="mouse" />
            </div>

            <div class="contentBox">
              <h3>{item.title}</h3>
              <h2 class="price">₹{item.price}</h2>
              <button href="#" class="buy" onClick={() => handleAdd(id)}>Buy Now</button>
            </div>
          </div>)
        })}
      </div>
    </>
  )
}

export default Products