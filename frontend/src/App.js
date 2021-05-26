import './App.css';
import React from "react";
import Navbar from './components/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import {BarChart,TagCloud} from "./pages/diagram";
import {Language,TwitterCount} from "./pages/map";
import Test from "./pages/test";

class App extends React.Component{
  render(){
    return (
      <div>
        <Router>
        <Navbar />
        <Switch>
          <Route path='/pages/home' exact component={Home} />
          <Route path='/pages/map/language' exact component={Language} />
          <Route path='/pages/map/count' exact component={TwitterCount} />
          <Route path='/pages/diagram/barchart' exact component={BarChart} />
          <Route path='/pages/diagram/tagcloud' exact component={TagCloud} />
          <Route path='/test' exact component={Test} />
        </Switch>
      </Router>
      </div>
    )
  }
}
export default App;

