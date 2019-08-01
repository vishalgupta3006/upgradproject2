import React, { Component } from 'react';
import './App.css';
import ShowList from './ShowList.js';
import ShowForm from './ShowForm.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      country: 'india',
      items: null
    };

  }

  callBackFunction=(data)=>{
    this.setState({country:data.country,items:data.Items});
    console.log(this.state.items.tracks.track[0])
      
    }
  render() {
    return (
      <div >
        <center >
          <h1 className="heading">top tracks in {this.state.country}</h1>
        </center>
        <ShowForm callBackFunction={this.callBackFunction}/><br/><br/>
        <ShowList country={this.state.country} items={this.state.items} />
        

      </div>
    );
  }
  async componentDidMount(){
    const url=`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=india&api_key=c181c5723583a21ac8d2a3d653463752&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        this.setState({items:data});
  }

}


export default App;
