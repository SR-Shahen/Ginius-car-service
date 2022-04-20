
import './App.css';
import Header from './Componant/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Componant/Home/Home';
import Product from './Componant/Product/Product';
import Login from './Componant/Login/Login';
import SignUp from './Componant/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/product' element={<Product></Product>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  );
}

export default App;
