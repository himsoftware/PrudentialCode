import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBook from './component/SearchBooks';
import BookInfoDetails from "./component/BookInfoDetails";

class App extends Component {
  state={
    results:[],
    expandedBook:null
  }
  setBooksResults = results => {
    this.setState({results});
  }
  expandBook = expandedBook => {
    this.setState({expandedBook});
  }
  collapseBook = () => {
    this.setState({expandedBook:null});
  }
  render() {
    return (
      <div className="container">
      <div className="header clearfix mt-5">
      <h2 className="text-muted">Serach GoodReads Book</h2>
      </div>
        <div className="jumbotron">
        {
          this.state.expandedBook ? (
            <BookInfoDetails
            bookData={this.state.expandedBook} 
            collapseBook={this.collapseBook}
            />
          ):(
            <SearchBook
            results={this.state.results}
            setBooksResults= {this.setBooksResults}
            expandBook = { this.expandBook}
            />
          )
          }
        </div>
      </div>
    );
  }
}

export default App;
