import React, { Component } from 'react';
import SearchAppBar from './searchAppBar';
import '../App.css';
import searchApi from './invoke-search';
import Results from './results';
import BuyModal from './buymodal';
import transaction from '../funds/transaction';
import tradeApi from './invoke-buy';
class Search extends Component {

  constructor(props) {
      super(props)
      this.state = {
          results: [],
          buyObject: null,
          cash: 0,
      }
      this.onChange = this.onChange.bind(this)
      this.onBuy = this.onBuy.bind(this)
      this.handleBuyCancel = this.handleBuyCancel.bind(this)
      this.handleBuyOK = this.handleBuyOK.bind(this)
  }

  componentDidMount(){
    transaction.currentFunds('abc')
    .then((r)=>{
        this.setState(state => ({
            cash: r,
        }));
    })
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
    tradeApi.buy('abc',symbol,quantity)
    .then((r)=>{
        // replace this with an appropriate message
        console.log("Buy success")
    })
  }

  render() {
    const {buyObject} = this.state;
    return (
      <div>
        <SearchAppBar onChange={this.onChange}/>
        <Results results={this.state.results} onBuy={this.onBuy} />
        {buyObject && <BuyModal symbol={buyObject.symbol} price={buyObject.price} okHandler={this.handleBuyOK} cancelHandler={this.handleBuyCancel} cash={this.state.cash} /> }
      </div>
    );
  }
}

export default Search;