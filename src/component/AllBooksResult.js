import React from 'react';
import PropTypes from 'prop-types';
import SearchBookResults from './SearchBookResults';

const AllBooksResults = ({ books, expandBook}) => {
    return(
        <div className="row">
        {books.map(book=>(
            <SearchBookResults bookData = {book} expandBook={expandBook}/>
        ))}
        </div>
    );
}
AllBooksResults.propTypes = {
    books:PropTypes.array,
    expandBook:PropTypes.func
}
export default AllBooksResults;