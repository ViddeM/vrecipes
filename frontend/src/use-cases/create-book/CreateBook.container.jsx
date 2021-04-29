import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {CreateBook} from "./CreateBook";
import {
    onBookAuthorChange,
    onBookNameChange
} from "./CreateBook.action-creators";
import {loadRecipes} from "../search/RecipeSearch/RecipeSearch.action-creators";

const mapStateToProps = state => ({
    name: state.root.createBook.name,
    author: state.root.createBook.author,
    recipes: state.root.createBook.recipes
});

const mapDispatchToProps = dispatch => ({
    onBookNameChange: newName => dispatch(onBookNameChange(newName)),
    onBookAuthorChange: newAuthor => dispatch(onBookAuthorChange(newAuthor)),
    loadRecipes: () => dispatch(loadRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateBook));
