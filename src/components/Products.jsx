import React from 'react'
import { useSelector } from 'react-redux'
import '../assets/product.css'
// import img1 from '../assets/Images/nike-shoes.png'

const Products = () => {
  const products = useSelector((state) => state.products)
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

        {products && products.map((item) => {
          return (<div class="card">
            <div class="imgBox">
              <img src={item.image} alt="mouse corsair" class="mouse" />
            </div>

            <div class="contentBox">
              <h3>{item.title}</h3>
              <h2 class="price">₹{item.price}</h2>
              <button href="#" class="buy">Buy Now</button>
            </div>
          </div>)
        })}
      </div>
    </>
  )
}

export default Products