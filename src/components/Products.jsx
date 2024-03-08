import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../redux/Action'
import { authentication } from '../App'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../redux/firebase'
import { useNavigate } from 'react-router'
import '../assets/product.css'
import Swal from 'sweetalert2'


const Products = () => {
  const products = useSelector((state) => state.products)
  // const cart = useSelector((state) => state.cart)
  const { logedUser, setLogedUser } = useContext(authentication)
  const [dishes, setDishes] = useState(products)
  const [cart, setCart] = useState([])
  const [originalDishes, setOriginalDishes] = useState([]);
  const [searchDish, setSearchDish] = useState('')
  const [selectedType, setSelectedType] = useState('');
  const [sortByPrice, setSortByPrice] = useState(false);
  const [noRecord, setNoRecord] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // console.log(dishes);

  useEffect(() => {
    if (dishes.length === 0) {
      setNoRecord(true)
    } else {
      setNoRecord(false)
    }
  }, [dishes])

  const handleSearch = (e) => {
    setSearchDish(e.target.value)
  }

  const handleSort = () => {
    setSortByPrice(!sortByPrice);
  }

  const handleFilterByType = (type) => {
    setSelectedType(type);
    if (type === "All") {
      setDishes(originalDishes);
    } else {
      setSelectedType(type);
      const filteredDishes = originalDishes.filter((dish) =>
        dish.type.toLowerCase().includes(type.toLowerCase())
      );
      setDishes(filteredDishes);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDishes = products
        setOriginalDishes(allDishes);

        let filteredDishes = allDishes;

        if (selectedType !== 'All') {
          filteredDishes = allDishes.filter((dish) =>
            dish.type.toLowerCase().includes(selectedType.toLowerCase())
          );
        }

        filteredDishes = filteredDishes.filter((dish) =>
          dish.name.toLowerCase().includes(searchDish.toLowerCase())
        );

        let sortedDishes = [...filteredDishes];

        if (sortByPrice) {
          sortedDishes = sortedDishes.sort((a, b) => a.price - b.price);
        }

        setDishes(sortedDishes);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchData()
  }, [searchDish, setDishes, selectedType, sortByPrice])

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
          <input type="text" className='form-control w-25' placeholder='Search Dish...' value={searchDish} onChange={handleSearch} />
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
            {products && products.map((item, id) => {
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