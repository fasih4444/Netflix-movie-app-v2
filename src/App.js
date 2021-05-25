import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Search from './components/Search';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav />
      <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/search'  component={Search}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
