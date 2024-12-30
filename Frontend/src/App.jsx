import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Men from './Pages/Mens'
import Women from './Pages/Women'
import Kids from './Pages/Kids'
import Header from './Component/Header/Header.jsx'
import Navbar from './Component/Navbar/Navbar.jsx'
import Footer from './Component/Footer/Footer.jsx'
import Cart from './Pages/CartItems.jsx'
import SearchResults from './Pages/SearchResults'
import mens_banner from './assets/men-hero.png'
import women_banner from './assets/women-hero.png'
import kids_banner from './assets/kids-hero.png'
import hero from './assets/family-hero.png'
import Logout from './Pages/Logout.jsx'
import { ContextProvider } from './Context/ContextProvider.jsx'
import OrderPlaced from './Pages/OrderPlaced.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx'
import MyAccount from './Component/MyAccount/MyAccount.jsx';
import ResetPassw from './Component/ResetPassw/Resetpassw.jsx'
import Form from './Pages/form.jsx'
import Checkout from './Pages/Checkout.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <div className="app-layout">
            <Header />
            <Navbar />
            <div className="app-content">
              <Routes>
                <Route path="/" element={<Home banner={hero} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/men" element={<Men banner={mens_banner} />} />
                <Route path="/women" element={<Women banner={women_banner} />} />
                <Route path="/kids" element={<Kids banner={kids_banner} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/order" element={<OrderPlaced />} />
                <Route path="/myAcc" element={<MyAccount />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/form" element={<Form />} />
                <Route path="/forgetpass" element={<ForgetPassword/>} />
                <Route path="/resetpass" element={<ResetPassw/>} />
                <Route path="/checkout" element={<Checkout/>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </ContextProvider>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
