import React, { Component } from 'react';
import './App.css';
import ShowList from './ShowList.js';
import ShowForm from './ShowForm.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      country: 'india',
      items: 1
    };


  }

  callBackFunction=(data)=>{
    this.setState({country:data.country});
    this.setState({items:data.Items});
    console.log(this.state.items.tracks.track[0])
    }
  render() {
    return (
      <div >
        <center >
          <h1 className="heading">top tracks in {this.state.country}</h1>
        </center>
        <ShowForm callBackFunction={this.callBackFunction}/>
        <ShowList country={this.state.country} items={this.state.items} />
      </div>
    );
  }
}

export default App;
