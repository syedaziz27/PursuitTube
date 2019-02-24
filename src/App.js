import React, { Component } from 'react';

import Navbar from './components/Navbar'
import Home from './containers/Home'
import VideoPlayer from './containers/Video'
import Search from './containers/Search'
import Userlist from './containers/UserList'
import FeedList from './containers/FeedList'

import { Route, Link } from 'react-router-dom'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      videoID:'',
      search:'ariana grande',
      users:[{name:'syed',
              feed:[]
            }]
    }

  }
  //use this function to update the class
  //param is object that has property to update and value
  changeState = (obj) =>{
    this.setState(obj,()=>console.log(this.state))
  }
  
  render() {
    return (
      <>
        <Route path='/' render={()=><Navbar/>} />
        <Route path='/' exact render={()=><Home/>} />
        
        {/* Tarek worked on video and search components on 2/23/19 */}
        <Route path='/video' exact render={()=><VideoPlayer id={this.state.videoID}/>} />
        <Route path='/search' exact render={()=><Search query={this.state.search} changeState={this.changeState}/>} />
        
        <Route path='/userlist' exact render={()=><Userlist/>} />
        <Route path='/feedlist' exact render={()=><FeedList/>} />
      </>
    );
  }
}

export default App;
