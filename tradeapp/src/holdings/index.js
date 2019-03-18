import React, { Component } from 'react';
import FolioTable from './foliotable';
import portfolio from './invoke-folio';

class Holdings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      folio: null,
      isLoaded: false,
    }
  }

 

  componentDidMount() {
    console.log("Helloo ")
    portfolio.currentFolio('abc')
    .then((r)=>{
      console.log("Here: ", r)
      const rows = r;
      this.setState((state)=>({
        rows: rows,
        isLoaded: true,
      }))
    })
  }

  render() {
    const { rows, isLoaded } = this.state;
    if(!isLoaded) {
      return (
        <div>Loading...</div>
      )
    } else {
    return (
        <div>
            <FolioTable rows={rows}/>
        </div>
      );
    }
  }
}

export default Holdings;