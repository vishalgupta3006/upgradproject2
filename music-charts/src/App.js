import React, { Component } from 'react';
import './App.css';
import ShowList from './ShowList.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      country: 'india',
      items: null
    };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({ country: event.target.value });
  }
  async onFormSubmitted(e) {
    e.preventDefault();
    const url = `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${this.state.country}&api_key=c181c5723583a21ac8d2a3d653463752&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    this.setState({ items: data });
    console.log(this.state.items);
  }
  render() {
    return (
      <div >
        <center>
          <h1 className="heading">top tracks in {this.state.country}</h1>
        </center>
        <form onSubmit={this.onFormSubmitted.bind(this)}>
          <div className="form-row align-items-center">
            <div className="col-md-3"></div>
            <div className="col-md-4">
              <select name="countrySelecter" value={this.state.value} onChange={this.handleChange} className="custom-select">
                <option value="india">India</option>
                <option value="canada">Canada</option>
                <option value="france">France</option>
                <option value="china">China</option>
                <option value="greece">Greece</option>
                <option value="japan">Japan</option>
              </select>
            </div>
            <div className="col-md-4">
              <button name="submitbutton" type="submit" className="btn search-btn">Search</button>
            </div>
          </div>
        </form>
        <ShowList country={this.state.country} items={this.state.items} />
      </div>
    );
  }
}

export default App;
