import React, { Component } from 'react';
import axios from 'axios';
import AllBooksResult from './AllBooksResult';
import PropTypes from 'prop-types';

const apiKeyData = process.env.REACT_APP_API_KEY;

class SearchBooks extends React.Component{
    state = {
        searchText:'',
        error:'',
        fetchingData:false
    }
    onButtonClick = ()=>{
        this.setState({
            fetchingData:true
        });
        console.log('ButtonClick');
        const {searchText} = this.state;
        const requestUri = 
        `https://cors-anywhere.herokuapp.com/`+
        `https://www.goodreads.com/search/index.xml?key=${apiKeyData}&q=${searchText}`;
        axios.get(requestUri)
            .then(res=>{
                this.parseXMLResponseData(res.data); //  always used .data to get specific response data
            })
            .catch(error=>{
                this.setState({
                    error:error.toString(),
                    fetchingData:false
                })
            });
    }
    // This method is used to parse xml received from good reads api
    parseXMLResponseData = response => {
        const parser = new DOMParser();
        console.log('parser', parser);
        const xmlParserResponseData = parser.parseFromString(response, "application/xml");
        console.log('parseXMLResponseData', xmlParserResponseData);
        const parseError = xmlParserResponseData.getElementsByTagName("parsererror");
        if (parseError.length) {
            this.setState({
                error:'error while feching data',
                fetchingData:false
            })
        } else {
            const xmlResults = new Array(...xmlParserResponseData.getElementsByTagName('work'));
            const searchJSONResult = xmlResults.map(result=>this.xmlToJson(result));
            this.setState({fetchingData:false},() => {
                this.props.setBooksResults(searchJSONResult);
            })
            
        }
    }
    // This function is used to convert xml to JSON 
    // Its loops through each child node and save the value in key value format
    xmlToJson = result => {
        const allNodes = new Array(...result.children);
        const jsonResultData = {};// blank object to store the JSOn Value
        allNodes.forEach(node => {
            if (node.children.length) {
                jsonResultData[node.nodeName] = this.xmlToJson(node);
            } else {
                jsonResultData[node.nodeName] = node.innerHTML;
            }
        });
        console.log('xmlToJson ====>>> ', jsonResultData);
        return jsonResultData;
    }
    onTextChange = e =>{
        this.setState({
            searchText:e.target.value
        })
    }
    render(){
        return(
            <div className="form-group row">
                <input 
                 className="mr-1 col-sm-9 form-control"
                 type="text"
                 placeholder="Search Books by Title,Author, or ISBN"
                 name="Search Text"
                 onChange={this.onTextChange}
                 value={this.state.searchText}
                />
                <button
                className="col-sm-2 btn btn-primary"
                onClick={this.onButtonClick}
                >
                Search
                </button>
                {/** 
                * If data is fetching its shows "loading...." 
                if error occured it will displayed error or display the results
                */}
                {
                    this.state.fetchingData ? (
                        <p className="lead text-center">{"loading...."}</p>
                    ): (
                        (
                            this.state.error && ( 
                                <p className="text-danger">{this.state.error}</p>
                            )) || (
                                <AllBooksResult
                                books={this.props.results}
                                expandBook={this.props.expandBook}
                                />
                            )
                    )
                }
               
            </div>
        )
    }
}
SearchBooks.propTypes ={
    results: PropTypes.array,
    setBooksResults:PropTypes.func,
    expandBook:PropTypes.func
}
export default SearchBooks