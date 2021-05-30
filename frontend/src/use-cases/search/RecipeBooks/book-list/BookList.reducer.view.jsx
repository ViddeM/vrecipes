import {ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED} from "../RecipeBookSearch.actions";

const mockBooks = [
    {
        "id": 0,
        "unique_name": "mormors_lilla_kokbok",
        "name": "Mormors lilla kokbok",
        "author": "Margit Magnusson",
        "uploaded_by": {
            name: "Vidar Magnusson"
        }
    },
    {
        "id": 1,
        "unique_name": "spritboken_2.1",
        "name": "Spritboken 2.1",
        "author": "Some dude",
        "uploaded_by": {
            name: "Some whitelisted dude"
        }
    }
]

const initialState = {
    books: [],
    filteredBooks: [],
    filterText: ""
}


export function bookList(state = initialState, action) {
    switch (action.type) {
        case ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED:
            const search = action.payload.newValue.toLowerCase();
            return Object.assign({}, state, {
                filteredBooks: filterBooks(state.books, search),
                filterText: search
            })
        default:
            return state;
    }
}

function filterBooks(books, search) {
    return books.filter(book => {
        return book.name.toLowerCase().includes(search) ||
        book.uploaded_by.name.toLowerCase().includes(search);
    })
}