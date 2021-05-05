import './App.css';
import React from "react";
import Navbar from './components/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import {BarChart,WordCloud} from "./pages/diagram";
import {Language,Sentiment} from "./pages/map";


class App extends React.Component{
  render(){
    return (
      <div>
        <Router>
        <Navbar />
        <Switch>
          <Route path='/pages/home' exact component={Home} />
          <Route path='/pages/map/language' exact component={Language} />
          <Route path='/pages/map/sentiment' exact component={Sentiment} />
          <Route path='/pages/diagram/barchart' exact component={BarChart} />
          <Route path='/pages/diagrams/wordcloud' exact component={WordCloud} />
        </Switch>
      </Router>
      </div>
    )
  }
}
export default App;

