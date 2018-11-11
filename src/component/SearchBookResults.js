import React from 'react';
import PorpTypes from 'prop-types';

const SearchBooksResult = ({bookData,expandBook}) => {
    const bookTitle = bookData.best_book.title;
    let displayTitle = bookTitle
        .split(" ")
        .slice(0, 4)
        .join(" ");
    if (bookTitle.length > displayTitle.length) {
        displayTitle += "....";
    }
    return(
        <div className="col-lg-2 col-sm-4 col-md-3">
            <div className="card">
                <img 
                className="card-img-top pl-2 pr-2 pt-2"
                src={bookData.best_book.image_url}
                alt="Book Cover"
                height="150px"
                />
                <div className="card-body">
                <p
                 className="text-sm-left card-title font-weight-bold"
                 data-toggle="tooltip"
                 data-placement="bottom"
                 title={displayTitle.includes("....")? bookTitle:""}
                >
                    {displayTitle}
                </p>
                <p 
                className="text-sm-left card-text"
                >
                    {bookData.best_book.author.name}
                </p>
                <button
                className="btn btn-primary"
                onClick={()=>expandBook(bookData)}
                >
                More Info...
                </button>
                </div>
            </div>
        </div> 
    )

}
SearchBooksResult.propTypes = {
    bookData:PorpTypes.array,
    expandBook:PorpTypes.func
}

export default SearchBooksResult;