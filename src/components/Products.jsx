import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../redux/Action'
import { authentication } from '../App'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../redux/firebase'
import { useNavigate } from 'react-router'
import '../assets/product.css'
// import Swal from 'sweetalert2'


const Products = () => {
  const products = useSelector((state) => state.products)
  const { logedUser, setLogedUser } = useContext(authentication)
  const [selectedType, setSelectedType] = useState('All');
  const [sortPrice, setSortPrice] = useState(true);
  const [list, setList] = useState(products)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    let title = e.target.value
    let search = products
      .filter(item =>
        item.title.toLowerCase().includes(title.toLowerCase())
      )
    setList(search)
  }

  const handleSort = () => {
    if (sortPrice) {
      let newList = [...products]
      let sorted = newList.sort((a, b) => a.price - b.price);
      setList(sorted)
      setSortPrice(false)
    } else {
      setList(products)
      setSortPrice(true)
    }
  }

  const handleFilterByType = (e) => {
    setSelectedType(e)
    let name = e
    let search = products.filter(item => name === 'All' ? true : item.type === name)
    setList(search)
  };

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
      <h1 className="heading py-3">Exquisite Meals</h1>
      <div className="filter-area bg-body-secondary rounded-5 mt-4 mb-5 py-2 px-5">
        <div className="d-flex container align-items-center justify-content-between">
          <input type="text" className='form-control w-25' placeholder='Search Dish...' onChange={handleSearch} />
          <div className="sortbyname">
            <div className="d-flex align-items-center justify-content-Evenly gap-2">
              <button className={`btn btn-outline-danger ${selectedType === 'All' ? 'active' : ''}`} onClick={() => handleFilterByType('All')}>
                All
              </button>
              <button className={`btn btn-outline-danger ${selectedType === 'Burger' ? 'active' : ''}`} onClick={() => handleFilterByType('Burger')}>
                Burger
              </button>
              <button className={`btn btn-outline-danger ${selectedType === 'Wrap' ? 'active' : ''}`} onClick={() => handleFilterByType('Wrap')}>
                Wrap
              </button>
              <button className={`btn btn-outline-danger ${selectedType === 'Fries' ? 'active' : ''}`} onClick={() => handleFilterByType('Fries')}>
                Fries
              </button>
              <button className={`btn btn-outline-danger ${selectedType === 'Beverages' ? 'active' : ''}`} onClick={() => handleFilterByType('Beverages')}>
                Beverages
              </button>
              <button className='btn btn-success' onClick={handleSort}>Sort Price</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container1 d-flex justify-content-around">
        <section className="section-meals">
          <div className="grid grid--3-cols margin-right-md">
            {list && list.map((item, id) => {
              return (
                <div className="meal" key={id}>
                  <img
                    src={item.image}
                    className="meal-img"
                  />
                  <div className="meal-content">
                    <div className="meal-tags">
                      <span className="tag tag--vegan">{item.type}</span>
                    </div>
                    <p className="meal-title">{item.title}</p>
                    <h2 className="price">₹{item.price}</h2>
                    <button type="button" className="btn btn-sm btn-default" onClick={() => handleAdd(id)}>Order Now</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </>
  )
}

export default Products