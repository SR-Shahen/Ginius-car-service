
import './App.css';

import { Route, Routes } from 'react-router-dom';


import SignUp from './Componant/SignUp/SignUp';
import Product from './Componant/Pages/Product/Product';
import Home from './Componant/Pages/Home/Home';
import Header from './Componant/Shared/Header/Header';
import Login from './Componant/Login/Login';



function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/product' element={<Product></Product>} />
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  );
}

export default App;
