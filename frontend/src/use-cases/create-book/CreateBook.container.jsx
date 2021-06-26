import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {CreateBook} from "./CreateBook";
import {
    onBookAuthorChange,
    onBookNameChange, onEditedRecipeBookSave, onRecipeBookSave
} from "./CreateBook.action-creators";
import {loadRecipes} from "../search/RecipeSearch/RecipeSearch.action-creators";

const mapStateToProps = state => ({
    book: state.root.createBook,
    saveError: state.root.createBook.saveError,
    validationErrors: state.root.createBook.errors,
    redirectTo: state.root.createBook.redirectTo,
});

const mapDispatchToProps = dispatch => ({
    onBookNameChange: newName => dispatch(onBookNameChange(newName)),
    onBookAuthorChange: newAuthor => dispatch(onBookAuthorChange(newAuthor)),
    loadRecipes: () => dispatch(loadRecipes()),
    onSave: book => dispatch(onRecipeBookSave(book)),
    onEditedBookSave: book => dispatch(onEditedRecipeBookSave(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateBook));
