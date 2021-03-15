import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreens'
import ProductScreen from './Screens/ProductScreen'
import Landing from './Screens/LandingScreen'
import About from './Screens/About'
import ArtistScreen from './Screens/ArtistScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import CheckoutScreen from './Screens/CheckoutScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-0" >
        
          <Route path='/' component={Landing} exact />
          <Container>
          <Route path='/store' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/about' component={About} />
          <Route path='/artists' component={ArtistScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/checkout' component={CheckoutScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />

          <Route path='/search/:keyword' component={HomeScreen} exact/>
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
