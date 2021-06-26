import {connect} from "react-redux";
import {RecipeBook} from "./RecipeBook";
import {
    backToBookSearch, editRecipeBook,
    loadRecipeBook,
    resetRecipeBook
} from "./RecipeBook.action-creators";

const mapStateToProps = state => ({
    recipeBook: state.root.book.book,
    error: state.root.book.error,
    redirectTo: state.root.book.redirectTo,
});

const mapDispatchToProps = dispatch => ({
    backToBookSearch: () => dispatch(backToBookSearch()),
    loadRecipeBook: id => dispatch(loadRecipeBook(id)),
    resetRecipeBook: () => dispatch(resetRecipeBook()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBook);
