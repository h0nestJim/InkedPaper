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
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
