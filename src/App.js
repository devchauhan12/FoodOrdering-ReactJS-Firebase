import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from './components/Header';
import './assets/login.css'
import Login from './components/Login';
import SignUp from './components/SignUp';
import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app, db } from './redux/firebase';
import Dashboard from './components/Dashboard';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Products from './components/Products';
import { useDispatch } from 'react-redux';

export const authentication = createContext()

function App() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [logedUser, setLogedUser] = useState(null)
  const dispatch = useDispatch()
  // let auth = getAuth(app)
  // const navigate = useNavigate()
  useEffect(() => {
    getData()
    getProducts()
  }, [])

  const getProducts = async () => {
    const productRef = collection(db, `Products`)
    let productList = await getDocs(productRef);
    // console.log(productList.docs[0].id)

    let products = productList.docs.map((item) => {
      console.log(item.id)
      return item.data()
    })
    // dispatch(getProducts(products))

  }
  const getData = async () => {
    const userRef = doc(db, `LoggedIn/pYqMp57QYmsXBFST9RrL`);
    let user = (await getDoc(userRef)).data().user;

    if (Object.keys(user).length > 0) {
      setLogin(true)
      setLogedUser(user)
      // navigate('/')
    }
  }
  return (
    <>
      <BrowserRouter>
        <authentication.Provider value={{ users, setUsers, login, setLogin, logedUser, setLogedUser }}>
          <Header />
          {/* <Login /> */}
          <Routes>
            {
              !login ? (
                <>
                  <Route path='/' element={<Login />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/products' element={<Products />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/products' element={<Products />} />
                  {/* <Route path='/cart' element={<Cart />} /> */}
                </>
              )
            }
          </Routes>
        </authentication.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
