import React from 'react'
import { useSelector } from 'react-redux'
import '../assets/product.css'
import img1 from '../assets/Images/nike-shoes.png'

const Products = () => {
  const products = useSelector((state) => state.products)
  return (
    <>
      <h1 className="heading">BUY SHOES</h1>
      <br />
      <main className="main main-inner">
        <article className="card">
          <div className="img-box">
            <img src={`https://pngimg.com/d/running_shoes_PNG5816.png`} />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

        <article className="card">
          <div className="img-box">
            <img src={`https://toppng.com/uploads/preview/running-shoes-11530959173kylrtsdxie.png`} />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

        <article className="card">
          <div className="img-box">
            <img src="images/img3.png" />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

        <article className="card">
          <div className="img-box">
            <img src="images/img4.png" />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

        <article className="card">
          <div className="img-box">
            <img src="images/img1.png" />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

        <article className="card">
          <div className="img-box">
            <img src="images/img2.png" />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

        <article className="card">
          <div className="img-box">
            <img src="images/img3.png" />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

        <article className="card">
          <div className="img-box">
            <img src="images/img4.png" />
          </div>
          <div className="s-name">
            <p>EXCLUSIVE SNEAKERS</p>
          </div>

          <div className="price-box">
            <a href="" className="icons">
              <ion-icon name="heart-outline"></ion-icon>
            </a>
            <div>
              <span className="sprice cprice">$876.00</span>
              <span className="sprice price">$499</span>
            </div>
            <a href="" className="icons">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>

        </article>

      </main>
    </>
  )
}

export default Products