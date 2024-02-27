import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import './assets/login.css'
import Login from './components/Login';
import SignUp from './components/SignUp';
import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app, db } from './redux/firebase';
import Dashboard from './components/Dashboard';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const authentication = createContext()

function App() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [logedUser, setLogedUser] = useState(null)
  let auth = getAuth(app)
  useEffect(() => {
    getData()
    getProducts()
  }, [])

  const getProducts = async () => {
    const productRef = doc(db, `Products`);
    let products = await getDocs(collection(productRef));
    console.log(products)

    // if (user.user.length > 0) {
    //   console.log(user.user.length)
    //   setLogin(true)
    //   setLogedUser(user)
    // }
  }
  const getData = async () => {
    const userRef = doc(db, `LoggedIn/pYqMp57QYmsXBFST9RrL`);
    const productRef = doc(db, `Products`)
    let user = (await getDoc(userRef)).data();
    // let products = (await getDoc(productRef)).data();
    // console.log(products)

    if (user.user.length > 0) {
      console.log(user.user.length)
      setLogin(true)
      setLogedUser(user)
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
                  {/* <Route path='/products' element={<Product />} /> */}
                </>
              ) : (
                <>
                  <Route path='/' element={<Dashboard />} />
                  {/* <Route path='/products' element={<Product />} /> */}
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
