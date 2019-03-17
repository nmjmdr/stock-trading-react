import React, { Component } from 'react';
import SearchAppBar from './searchAppBar';
import '../App.css';
import searchApi from './invoke-search';
import Results from './results';
import BuyModal from './buymodal';
class Search extends Component {

  constructor(props) {
      super(props)
      this.state = {
          results: [],
          buyObject: null,
      }
      this.onChange = this.onChange.bind(this)
      this.onBuy = this.onBuy.bind(this)
      this.handleBuyCancel = this.handleBuyCancel.bind(this)
      this.handleBuyOK = this.handleBuyOK.bind(this)
  }
  onChange(evt){
    const val = evt.target.value
    if(!val || val.length < 2) {
        return
    }
    // do search here
    searchApi.search(val)
    .then((r)=>{
        this.setState(state => ({
            results: r,
        }));  
    })
  }

  onBuy(buyObject) {
      this.setState((state)=> ({
          buyObject: buyObject,
      }));
  }

  handleBuyCancel() {
    this.setState((state)=> ({
        buyObject: null,
    }));
  }

  handleBuyOK(symbol, quantity) {
    this.setState((state)=> ({
        buyObject: null,
    }));
    console.log("Symbol, quantity: ", symbol, quantity)
  }

  render() {
    const {buyObject} = this.state;
    return (
      <div>
        <SearchAppBar onChange={this.onChange}/>
        <Results results={this.state.results} onBuy={this.onBuy} />
        {buyObject && <BuyModal symbol={buyObject.symbol} price={buyObject.price} okHandler={this.handleBuyOK} cancelHandler={this.handleBuyCancel} /> }
      </div>
    );
  }
}

export default Search;