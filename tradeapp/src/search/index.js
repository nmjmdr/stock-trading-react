import React, { Component } from 'react';
import SearchAppBar from './searchAppBar';
import '../App.css';
import searchApi from './invoke-search';
import Results from './results';

class Search extends Component {

  constructor(props) {
      super(props)
      this.state = {
          results: [],
      }
      this.onChange = this.onChange.bind(this)
  }
  onChange(evt){
    const val = evt.target.value
    if(!val || val.length < 2) {
        return
    }
    // do search here
    searchApi.search(val)
    .then((r)=>{
        console.log(r)
        this.setState(state => ({
            results: r,
        }));  
    })
  }

  onBuy(symbol) {
      console.log(symbol)
  }

  render() {
    return (
      <div>
        <SearchAppBar onChange={this.onChange}/>
        <Results results={this.state.results} onBuy={this.onBuy} />
      </div>
    );
  }
}

export default Search;