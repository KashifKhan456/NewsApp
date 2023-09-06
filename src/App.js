import Navbar from './Components/Navbar';
import News from './Components/News';
// import logo from './logo.svg';
import React, { Component } from 'react';
// React Router 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Top loading bar 
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 10;
  // API key protection 
  apiKey = process.env.REACT_APP_API_KEY
  // State for top loading bar 
  state={
    progress :0
  }
  setProgress = (progress)=>{
    this.setState({progress : progress})
  }
  render() {
    return (
      <Router>
      <div>
        <Navbar/>
        {/* Top Loading bar */}
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={2}
      />
        <Routes>
        <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country='us' category='general'/>}></Route>
        <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country='us' category='entertainment'/>}></Route>
        <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country='us' category='health'/>}></Route>
        <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country='us' category='science'/>}></Route>
        <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country='us' category='sports'/>}></Route>
        <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country='us' category='technology'/>}></Route>
        <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country='us' category='business'/>}></Route>
        </Routes>
      </div>
      </Router>
    )
  }
}
