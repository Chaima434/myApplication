import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">My Application</Link>
          </div>
          <div className="header-links">
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          
          </div>
        </header>
        <aside className="sidebar">
          <h3>Menu </h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            <i className="fa fa-times-circle"></i>
          </button>
          <ul className="categories">
            <li>
              <Link to="">Page d'acceuil</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {userInfo && userInfo.isAdmin && (
              <li>
                {/* <Link to="/products">Employés</Link> */}
                <Link to="/products">Stock</Link>
                <Link to="/orders">Ordres</Link>
                {/* <Link to="/products">Products</Link> */}
              </li>
            )}
            {/* <li>
              <Link to="/category">Smartphone</Link>
            </li>

            <li>
              <Link to="/category">Matériel Informatiques</Link>
            </li> */}
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
         Ma premier Application 2021
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
