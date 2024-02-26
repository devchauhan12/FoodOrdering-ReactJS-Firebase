import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import './assets/login.css'
import Login from './components/Login';


function App() {
  return (
    <>
      <BrowserRouter>
        {/* <authentication.Provider value={{ users, setUsers, login, setLogin, logedUser, setLogedUser }}> */}
        <Header />
        <Login />
        <Routes>
          {/* {
              !login ? (
                <>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/products' element={<Product />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<Home />} />
                  <Route path='/products' element={<Product />} />
                  <Route path='/cart' element={<Cart />} />
                </>
              )
            } */}
        </Routes>
        {/* </authentication.Provider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
