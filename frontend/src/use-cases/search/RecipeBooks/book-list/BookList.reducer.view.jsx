import {
    GET_RECIPE_BOOKS_SUCCESSFUL,
    ON_RECIPE_BOOK_SEARCH_FIELD_CHANGED
} from "../RecipeBookSearch.actions";

const mockBooks = [
    {
        "id": 0,
        "unique_name": "mormors_lilla_kokbok",
        "name": "Mormors lilla kokbok",
        "author": "Margit Magnusson",
        "uploadedBy": {
            name: "Vidar Magnusson"
        }
    },
    {
        "id": 1,
        "unique_name": "spritboken_2.1",
        "name": "Spritboken 2.1",
        "author": "Some dude",
        "uploadedBy": {
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
        case GET_RECIPE_BOOKS_SUCCESSFUL:
            const recipeBooks = action.payload.response.data.data.recipeBooks;
            return Object.assign({}, state, {
                books: recipeBooks,
                filteredBooks: recipeBooks
            })
        default:
            return state;
    }
}

function filterBooks(books, search) {
    return books.filter(book => {
        return book.name.toLowerCase().includes(search) ||
        book.uploadedBy.name.toLowerCase().includes(search);
    })
}