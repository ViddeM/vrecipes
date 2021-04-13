import React from "react"
import {BookListContainer} from "./BookList.styles.view";
import BookListCard from "./BookListCard/BookListCard.container.view";

export const BookList = props => {
    return (
        <BookListContainer>
            {
                props.books.map(book => (
                    <BookListCard book={book}/>
                ))
            }
        </BookListContainer>
    )
}